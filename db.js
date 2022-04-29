const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('scores.db');

exports.getScores = (req, res) => {
    db.all('SELECT * FROM scores', (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
};

exports.getBestScore = (req, res) => {
    db.get('SELECT * FROM scores ORDER BY score DESC LIMIT 1', (err, row) => {
        if (err) {
            throw err;
        }
        res.send(row);
    });
};

exports.saveScore = (req, res) => {
    const { user, score } = req.body;
    db.run('INSERT INTO scores (user, score) VALUES (?, ?)', [user, score], (err) => {
        if (err) {
            throw err;
        }
        res.sendStatus(200);
    });
};

