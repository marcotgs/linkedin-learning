var MongoClient = require("mongodb").MongoClient,
  Hapi = require("hapi");

var url = "mongodb://localhost:27017";

var server = new Hapi.Server({ port: 3000 });

server.route([
  // Get tour list
  {
    method: "GET",
    path: "/api/tours",
    handler: function(request, h) {
      return new Promise((resolve, reject) => {
        collection.find({ ...request.query }).toArray((err, tours) => {
          if (err) reject(err);
          resolve(tours);
        });
      });
    }
  },
  // Add new tour
  {
    method: "POST",
    path: "/api/tours",
    handler: function(request, reply) {
      return new Promise((resolve, reject) => {
        collection.insertOne(request.payload, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
    }
  },
  // Get a single tour
  {
    method: "GET",
    path: "/api/tours/{name}",
    handler: function(request, reply) {
      return new Promise((resolve, reject) => {
        collection.findOne({ tourName: request.params.name }, (err, tour) => {
          if (err) reject(err);
          resolve(tour);
        });
      });
    }
  },
  // Update a single tour
  {
    method: "PUT",
    path: "/api/tours/{name}",
    handler: function(request, reply) {
      return new Promise((resolve, reject) => {
        if (request.query.replace) {
          collection.replaceOne(
            { tourName: request.params.name },
            { tourName: request.params.name, ...request.payload },
            (err, results) => {
              collection.findOne(
                { tourName: request.params.name },
                (err, tour) => {
                  if (err) reject(err);
                  resolve(tour);
                }
              );
            }
          );
        } else {
          collection.updateOne(
            { tourName: request.params.name },
            { $set: request.payload },
            (err, results) => {
              collection.findOne(
                { tourName: request.params.name },
                (err, tour) => {
                  if (err) reject(err);
                  resolve(tour);
                }
              );
            }
          );
        }
      });
    }
  },
  // Delete a single tour
  {
    method: "DELETE",
    path: "/api/tours/{name}",
    handler: function(request, h) {
      return new Promise((resolve, reject) => {
        collection.deleteOne(
          { tourName: request.params.name },
          (err, results) => {
            collection.findOne({ tourName: request.params.name }, err => {
              if (err) reject(err);
              resolve(h.response().code(204));
            });
          }
        );
      });
    }
  },
  // Home page
  {
    method: "GET",
    path: "/",
    handler: function(request, reply) {
      reply("Hello world from Hapi/Mongo example.");
    }
  }
]);

MongoClient.connect(url, function(err, client) {
  console.log("connected correctly to server");
  const db = client.db("learnin_mongo");
  collection = db.collection("tours");
  server
    .start()
    .then(() => console.log("Hapi is listening to http://localhost:3000"));
});
