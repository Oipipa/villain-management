const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const villainModel = require('./models/villain');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    villainModel.getAllVillains((err, villains) => {
        if (err) {
            res.status(500).send('Error accessing the database');
        } else {
            res.render('index', { villains });
        }
    });
});

// ... additional routes will go here
// Add Villain Route
app.post('/add-villain', (req, res) => {
    const { name, age, power } = req.body;
    villainModel.addVillain(name, age, power, (err) => {
        if (err) {
            res.status(500).send('Error adding villain to the database');
        } else {
            res.redirect('/');
        }
    });
});

// Delete Villain Route (we'll implement this later)
// ...
// Delete Villain Route
app.post('/delete-villain/:id', (req, res) => {
    const id = req.params.id;
    villainModel.deleteVillain(id, (err) => {
        if (err) {
            res.status(500).send('Error deleting villain from the database');
        } else {
            res.redirect('/');
        }
    });
});

app.post('/edit-villain/:id', (req, res) => {
    const id = req.params.id;
    const { name, age, power } = req.body;
    villainModel.updateVillain(id, name, age, power, (err) => {
        if (err) {
            res.status(500).send('Error updating villain in the database');
        } else {
            res.redirect('/');
        }
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
