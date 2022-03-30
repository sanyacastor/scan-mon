const faunadb = require("faunadb");
const q = faunadb.query;

exports.handler = async function (event, context) {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET,
    domain: "db.eu.fauna.com",
  });

  serverClient
    .query(
      q.Update(q.Ref(q.Collection("scanners"), "327479628938608836"), {
        data: { points: JSON.parse(event.body) },
      })
    )
    .then((ret) => console.log(ret))
    .catch((err) => {
      console.error(
        "Error: [%s] %s: %s",
        err.name,
        err.message,
        err.errors()[0].description
      );
      console.log(">RR", err);
    });

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({ message: "Hello World" }),
  // };
};
