const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const villainModel = require('./models/villain');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Define your routes here
// Root Route - Landing Page
app.get('/', (req, res) => {
    res.render('landing');
});


app.get('/view-villains', (req, res) => {
    villainModel.getAllVillains((err, villains) => {
        if (err) {
            res.status(500).send('Error accessing the database');
        } else {
            res.render('index', { villains });
        }
    });
});

app.get('/add-villain', (req, res) => {
    res.render('add-villain');
});

app.post('/add-villain', upload.single('villainImage'), (req, res) => {
    const { name, age, power } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    villainModel.addVillain(name, age, power, imagePath, (err) => {
        if (err) {
            res.status(500).send('Error adding the villain');
        } else {
            res.redirect('/view-villains');
        }
    });
});

app.get('/edit-villain/:id', (req, res) => {
    const id = req.params.id;
    villainModel.getVillainById(id, (err, villain) => {
        if (err || !villain) {
            res.status(404).send('Villain not found');
        } else {
            res.render('edit-villain', { villain });
        }
    });
});

app.post('/edit-villain/:id', upload.single('villainImage'), (req, res) => {
    const id = req.params.id;
    const { name, age, power } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    villainModel.updateVillain(id, name, age, power, imagePath, (err) => {
        if (err) {
            res.status(500).send('Error updating the villain');
        } else {
            res.redirect('/view-villains');
        }
    });
});

app.get('/delete-villain/:id', (req, res) => {
    const id = req.params.id;
    villainModel.getVillainById(id, (err, villain) => {
        if (err || !villain) {
            res.status(404).send('Villain not found');
        } else {
            res.render('delete-villain', { villain });
        }
    });
});

app.post('/delete-villain/:id', (req, res) => {
    const id = req.params.id;
    villainModel.deleteVillain(id, (err) => {
        if (err) {
            res.status(500).send('Error deleting the villain');
        } else {
            res.redirect('/view-villains');
        }
    });
});

app.get('/manage-villains', (req, res) => {
    villainModel.getAllVillains((err, villains) => {
        if (err) {
            res.status(500).send('Error accessing the database');
        } else {
            res.render('manage-villains', { villains });
        }
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
