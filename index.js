const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

client.connect();

app.get("/trip", async (req, res) => {
  try {
    const trip = await client.query("SELECT * FROM trip;");
    res.header("Content-Type", "application/json");
    res.status(200);
    return res.json({ data: trip.rows });
  } catch (e) {
    console.error(e);
    res.status(500);
    return res.json({ error: "Internal server error" });
  }
});

app.all("*", (req, res) => {
  return res.json({ data: "Hello world!" });
});

process.env.PORT = process.env.PORT || 3000;
const port = process.env.PORT;
module.exports = app.listen(port, () => {
  console.log(`Backend server started`);
});