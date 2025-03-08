import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();
client.on("error", (err) => console.log("Redis Client Error" + err));

app.post("/submit", async (req, res) => {
  const { problemId, userId, code, language } = req.body;
  //store in database
  try {
    await client.lPush(
      "submission",
      JSON.stringify({ problemId, userId, code, language })
    );

    res.status(200).send("Submission received and stored");
  } catch (err) {
    console.error("Redis error: ", err);
    res.status(400).send("Fasiled to store submission");
  }
});

const startServer = async () => {
  try {
    client.connect();
    console.log("Connected to redis");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Server error, Failed to connect");
  }
};

startServer();
