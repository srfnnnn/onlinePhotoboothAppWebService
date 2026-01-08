const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();
const port = 3000;

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_port,
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
        const [rows] = await connection.execute('SELECT * FROM defaultdb.photobooth');
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
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error - could not add new package' +package_name});
    }
});