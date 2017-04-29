var mongoclient = require('mongodb').MongoClient;

function my_mongo(url) {
    var _db = null;

    function get_db(cb) {
        if (_db) {
            return cb(null, _db);
        } else {
            mongoclient.connect(
                url,
                (err, db) => {
                    if (err) {
                        _db = null;
                        console.log('DB connect error :', err);
                        return cb(err);
                    }
                    _db = db;
                    console.log('DB connect OK');
                    cb(null, _db);
                }
            );
        }
    }
    
    return (req, res, next) => {
        get_db((err, db) => {
            if (err) {
                res.send('DB connect error');
            } else {
                req.my_mongo_db = db;
                next();
            }
        });
    }
}

module.exports = my_mongo;