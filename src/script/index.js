var MongoClient = require('mongodb').MongoClient;
var restify = require('restify');
var crypto = require('crypto');
var corsMiddleware = require('restify-cors-middleware');
var mongo = require('mongodb');


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
    person: 'person'
};

function connect(callback) {
    MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var dbo = client.db("customers");
        callback(dbo, client);
    });
}

function add(obj, collection, callback) {
   connect(function(dbo, client) {
       dbo.collection(collection).insertOne(obj, function(err, res) {
           if (err) throw err;
           console.log("1 document inserted");
           callback(obj);
           client.close();
       });
   });
}

function get(collection, callback) {
    connect(function(dbo, client) {
        dbo.collection(collection).find({}).toArray(function(err, result) {
            if (err) throw err;
            client.close();
            callback(result);
        });
    });
}

function put(_id, newObj, collection, callback) {
    connect(function(dbo, client) {
        delete newObj._id;
        return dbo.collection(collection).update(
            {"_id": new mongo.ObjectID(_id)},
            newObj,
            function(err, result) {
                if (err) throw err;
                callback();
                client.close();
            }
        );
    });
}

function del(ids, collection, callback) {
    connect(function(dbo, client) {
        var idsObjectsArr = [];
        for (let i = 0; i < ids.length; i++) {
            idsObjectsArr.push(new mongo.ObjectID(ids[i]));
        }
        return dbo.collection(collection).deleteMany(
            {"_id": {"$in": idsObjectsArr}},
            function(err, result) {
                if (err) throw err;
                callback();
                client.close();
            }
        );
    });
}

var server = restify.createServer();
server.use(restify.plugins.bodyParser());

var cors = corsMiddleware({
    origins: ['*']
})
server.use(cors.actual);
server.opts(/.*/, function(req, res, next) {
    res.header('Access-Control-Allow-Methods', req.header('Access-Control-Request-Method'))
    res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'))
    res.send(200)
    return next()
});

server.post('/api/person', function(req, resp, next) {
    let body = req.body;
    let person = null;
    try {
        // TODO validation
        add(body, collections.person, function(person) {
            resp.send(person);
            next();
        });
    } catch (err) {
        console.log(err);
    }
});

server.put('/api/person/:id', function(req, resp, next) {
    let _id = req.params.id;
    let body = req.body;
    let counter = 0;
    try {
        // TODO validation
        put(_id, body, collections.person, function() {
            counter++;
            resp.end('items updated: ' + counter);
            next();
        });

    } catch (err) {
        console.log(err);
    }
});

server.del('/api/person', function(req, resp, next) {
    let ids = req.body;
    let counter = 0;
    try {
        // TODO validation
        del(ids, collections.person, function() {
            counter++;
            resp.end('items deleted: ' + counter);
            next();
        });

    } catch (err) {
        console.log(err);
    }

});

server.get('/api/person', function(req, resp, next) {
    try {
        get(collections.person, function (result) {
            console.log(result);
            resp.send(result);
            next();
        });
    } catch (err) {
        console.log(err);
    }
});

server.listen(8080, function() {
    console.log('Listening on 8080');
});