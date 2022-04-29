const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require("./db");
const port = 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.use("/assets", express.static(__dirname + "/assets"));

app.get("/api/getScores", db.getScores);
app.get("/api/getBestScore", db.getBestScore);
app.post("/api/saveScore", db.saveScore);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
