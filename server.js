const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();
const port = 3000;

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
};

const app = express();
app.use(express.json());

//start the server
app.listen(port, () => {
    console.log('Server running on port', port);
});

//Get all the appointment details
app.get('/allpackages', async (req,res) => {
    try {
        let connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM photobooth');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error for all packages'});
    }
});

//Add new package
app.post('/addpackages', async (req, res) => {
    const { package_name, description, duration_hours, backdrop_type, price, props_included, softcopy_photos, print_photos } = req.body;
    try {
        let connection = await mysql.createConnection(dbConfig);
        await connection.execute('INSERT INTO photobooth (package_name, description, duration_hours, backdrop_type, price, props_included, softcopy_photos, print_photos ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [package_name, description, duration_hours, backdrop_type, price, props_included, softcopy_photos, print_photos]);
        res.status(201).json({message: 'Package '+package_name+' added successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error - could not add new package' +package_name});
    }
});

// Update package using POST
app.post('/updatepackage/:id', async (req, res) => {
    const packageId = req.params.id;
    const { package_name, description, duration_hours, backdrop_type, price, props_included, softcopy_photos, print_photos } = req.body;

    try {
        let connection = await mysql.createConnection(dbConfig);

        const [result] = await connection.execute(
            `UPDATE photobooth 
             SET package_name = ?, description = ?, duration_hours = ?, backdrop_type = ?, price = ?, props_included = ?, softcopy_photos = ?, print_photos = ?
             WHERE id = ?`,
            [package_name, description, duration_hours, backdrop_type, price, props_included, softcopy_photos, print_photos, id]
        );

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Package not found' });
        } else {
            res.json({ message: 'Package updated successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - could not update package' });
    }
});

// Delete package using POST
app.post('/deletepackage/:id', async (req, res) => {
    const id = req.params.id;

    try {
        let connection = await mysql.createConnection(dbConfig);

        const [result] = await connection.execute(
            'DELETE FROM photobooth WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Package not found' });
        } else {
            res.json({ message: 'Package deleted successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - could not delete package' });
    }
});

