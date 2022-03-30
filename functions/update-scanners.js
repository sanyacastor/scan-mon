const faunadb = require("faunadb");
const q = faunadb.query;

exports.handler = async function (event, context) {
  const serverClient = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET,
    domain: "db.eu.fauna.com",
  });

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Request body is empty" }),
    };
  }

  return serverClient
    .query(
      q.Update(q.Ref(q.Collection("scanners"), "327479628938608836"), {
        data: { points: JSON.parse(event.body) },
      })
    )
    .then(() => {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Scanners positions updated" }),
      };
    })
    .catch((err) => {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: err.message }),
      };
    });
};
