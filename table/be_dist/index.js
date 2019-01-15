/*import moment from 'moment';*/
var MongoClient = require('mongodb').MongoClient;
var restify = require('restify');
var crypto = require('crypto');
var corsMiddleware = require('restify-cors-middleware');
var mongo = require('mongodb');
var express = require("express");
// var morgan     = require("morgan");
var app = express();

/**
 * Calculates the MD5 hash of a string.
 *
 * @param  {String} string - The string (or buffer).
 * @return {String}        - The MD5 hash.
 */
function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}

var url = 'mongodb://localhost:27017';

var collections = {
    values: 'values',
    item: 'item'
};
app.get("/", function (req, res) {
    res.sendFile("./app/index.html");
});

function connect(callback) {
    MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        var dbo = client.db("table");
        callback(dbo, client);
    });
}

function add(obj, collection, callback) {
    connect(function (dbo, client) {
        dbo.collection(collection).insertOne(obj, function (err, res) {
            if (err) throw err;
            console.log("1 item inserted");
            callback(obj);
            client.close();
        });
    });
}

function get(collection, callback) {
    connect(function (dbo, client) {
        dbo.collection(collection).find({}).toArray(function (err, result) {
            if (err) throw err;
            client.close();
            callback(result);
        });
    });
}

function put(_id, newObj, collection, callback) {
    connect(function (dbo, client) {
        delete newObj._id;
        return dbo.collection(collection).updateOne({ "_id": new mongo.ObjectID(_id) }, { "$set": newObj }, { upsert: true }, function (err, result) {
            if (err) throw err;
            callback();
            client.close();
        });
    });
}

function del(ids, collection, callback) {
    connect(function (dbo, client) {
        var idsObjectsArr = [];
        for (let i = 0; i < ids.length; i++) {
            idsObjectsArr.push(new mongo.ObjectID(ids[i]));
        }
        return dbo.collection(collection).deleteMany({ "_id": { "$in": idsObjectsArr } }, function (err, result) {
            if (err) throw err;
            callback();
            client.close();
        });
    });
}

function getOneByName(name, collection, callback) {
    connect(function (dbo, client) {
        dbo.collection(collection).find({ 'name': name }).toArray(function (err, result) {
            if (err) throw err;
            callback(result);
            client.close();
        });
    });
}

var server = restify.createServer();
server.use(restify.plugins.bodyParser());

var cors = corsMiddleware({
    origins: ['*']
});
server.use(cors.actual);
server.opts(/.*/, function (req, res, next) {
    res.header('Access-Control-Allow-Methods', req.header('Access-Control-Request-Method'));
    res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));
    res.send(200);
    return next();
});

server.post('/api/item', function (req, resp, next) {
    let body = req.body;
    var responseObj = {};
    try {
        getOneByName(body.name, collections.item, function (duplicateItem) {
            try {
                console.log("duplicateItem: ");
                console.log(duplicateItem);
                if (duplicateItem.length) {
                    throw new Error('Duplicate item found');
                }
                add(body, collections.item);
                responseObj = { type: "success" };
            } catch (err) {
                responseObj = { type: "error", msg: err.toString() };
            }
            resp.end(JSON.stringify(responseObj));
            next();
        });
    } catch (e) {
        console.log(e.toString());
    }
});

server.put('/api/item/:id', function (req, resp, next) {
    let _id = req.params.id;
    let body = req.body;
    try {
        // TODO validation
        body.price = parseFloat(body.price);

        put(_id, body, collections.item, function () {
            resp.end('Item updated');
            next();
        });
    } catch (err) {
        console.log(err);
    }
});

server.del('/api/item', function (req, resp, next) {
    let ids = req.body;
    try {
        // TODO validation
        del(ids, collections.item, function () {
            resp.end('Item deleted');
            next();
        });
    } catch (err) {
        console.log(err);
    }
});

server.get('/api/item', function (req, resp, next) {
    try {
        get(collections.item, function (result) {
            console.log(result);
            resp.send(result);
            next();
        });
    } catch (err) {
        console.log(err);
    }
});

server.listen(8080, function () {
    console.log('Listening on 8080');
});