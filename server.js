// GeoJSON Example

// see http://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require("mongodb").ObjectID;

MongoClient.connect("mongodb://localhost:27017/test?",
  {server: {socketOptions: { socketTimeoutMS: 5000}}},
  function(err,db) {
    if(!err) {
      console.log("Connected to db!");
      items = db.collection('geojson');
    } else {
      console.log("Error: " + err);
    }
});

var express = require('express');

var app = express();

app.set('port', process.env.EXPRESS_PORT || 3000);

app.use(express.static(__dirname + '/public'));

// see https://github.com/expressjs/body-parser
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.get('/api/item', function(req,res) {
  res.type('application/json');
  items.find().toArray(function(err, items) {
    res.send(items);  
  });
});

app.post('/api/item', jsonParser, function(req,res) {
  res.type('application/json');
  console.log("Item: %j", req.body);
  items.insert(req.body, 
      function() { 
        res.send({"ok":true});
        });
});

app.delete('/api/item/:id', jsonParser, function(req,res) {
  res.type('application/json');
  console.log("delete " + req.params.id );
  items.remove({"_id": ObjectID(req.params.id)},
    function(err,count) {
      console.log("in callback after remove");
      console.log(err);
      console.log(count);
      res.send({"ok":true});
    });
});

app.post('/api/query', jsonParser, function(req,res) {
  res.type('application/json');
  console.log("Query: %j", req.body);
      items.find( {location: 
        { $geoWithin: 
          { $geometry: 
            { type: 'Polygon', 
              coordinates : [[[0,0],[0,req.body.long],[req.body.lat,req.body.long],[req.body.lat,0],[0,0]]] }}}})
      .toArray(function(err,items){
        console.log("Items: %j", items);
        res.send(items);
      });
  });

  app.listen(app.get('port'), function(){
console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
    });