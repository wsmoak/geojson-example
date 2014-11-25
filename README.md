#GeoJSON Example

AngularJS / Express / mongoDB / NodeJS example of using GeoJSON to store and query location data.

```sh
npm install

(make sure mongoDB is running locally)

node server.js
```

The app allows you to add items to the database.  

An item consists of a description and a location.  A location is a point specified by latitude and longitude.

Validation on the form requires latitude to be between -90 and 90, while longitude is between -180 and 180.

Once you have added some points, you can query the items to find the ones within a box from [0,0] to the point you specify.

Try adding points with locations [3,5] and [25,72], and then querying using [10,10] and [30,80].

For more information on GeoJSON, see http://geojson.org .

For information on using GeoJSON with mongoDB, see http://blog.mongolab.com/2014/08/a-primer-on-geospatial-data-and-mongodb/ .

