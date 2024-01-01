const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./villains.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS villains (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER, power TEXT, imagePath TEXT)");
});

function getAllVillains(callback) {
    db.all("SELECT * FROM villains", callback);
}

function addVillain(name, age, power, imagePath, callback) {
    db.run("INSERT INTO villains (name, age, power, imagePath) VALUES (?, ?, ?, ?)", [name, age, power, imagePath], callback);
}

function getVillainById(id, callback) {
    db.get("SELECT * FROM villains WHERE id = ?", [id], callback);
}

function updateVillain(id, name, age, power, imagePath, callback) {
    db.run("UPDATE villains SET name = ?, age = ?, power = ?, imagePath = ? WHERE id = ?", [name, age, power, imagePath, id], callback);
}

function deleteVillain(id, callback) {
    db.run("DELETE FROM villains WHERE id = ?", [id], callback);
}

module.exports = { getAllVillains, addVillain, getVillainById, updateVillain, deleteVillain };
