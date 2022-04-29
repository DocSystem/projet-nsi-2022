const sqlite3 = require('sqlite3');
const fs = require("fs");

if (fs.existsSync("scores.db")) {
    console.log("Deleting existant db");
    fs.unlinkSync("scores.db");
}

const db = new sqlite3.Database("scores.db");

db.serialize(() => {
    db.run("CREATE TABLE scores (id INTEGER PRIMARY KEY, user TEXT, score INTEGER)");
});
db.close();
