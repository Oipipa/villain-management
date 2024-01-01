const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('villains.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS villains (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER, power TEXT)");
});

function getAllVillains(callback) {
    db.all("SELECT * FROM villains", function(err, rows) {
        callback(err, rows);
    });
}

function addVillain(name, age, power, callback) {
    db.run("INSERT INTO villains (name, age, power) VALUES (?, ?, ?)", [name, age, power], function(err) {
        callback(err);
    });
}

function deleteVillain(id, callback) {
    db.run("DELETE FROM villains WHERE id = ?", [id], function(err) {
        callback(err);
    });
}

function updateVillain(id, name, age, power, callback) {
    db.run("UPDATE villains SET name = ?, age = ?, power = ? WHERE id = ?", [name, age, power, id], function(err) {
        callback(err);
    });
}

module.exports = { getAllVillains, addVillain, deleteVillain, updateVillain };

