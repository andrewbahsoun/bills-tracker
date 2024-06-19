const client = require('./connection.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());

app.listen(3300, () => {
    console.log("Server is now listening at port 3300");
});

client.connect();

// GET request
app.get('/testing', (req, res) => {
    client.query('SELECT * FROM roommates', (err, result) => {
        if (!err) {
            res.send(result.rows);
        } else {
            console.log(err.message);
        }
    });
});

// GET request to fetch a specific roommate by ID
app.get('/testing/:roommate_id', (req, res) => {
    const roommateId = req.params.roommate_id;
    client.query('SELECT * FROM roommates WHERE roommate_id = $1', [roommateId], (err, result) => {
        if (!err) {
            res.send(result.rows);
        } else {
            console.log(err.message);
        }
    });
});

// POST request
app.post('/testing', (req, res) => {
    const user = req.body;
    let insertQuery = `INSERT INTO roommates (roommate_id, roommate_name, money_owed) 
                       VALUES (${user.roommate_id}, '${user.roommate_name}', '${user.money_owed}')`;

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Insertion was successful');
        } else {
            console.log(err.message);
        }
    });
});

// PUT request
app.put('/testing/:roommate_id', (req, res) => {
    let user = req.body;
    let updateQuery = `UPDATE roommates
                       SET roommate_name = '${user.roommate_name}',
                           money_owed = '${user.money_owed}'
                       WHERE roommate_id = ${req.params.roommate_id}`;

    client.query(updateQuery, (err, result) => {
        if (!err) {
            res.send('Update was successful');
        } else {
            console.log(err.message);
        }
    });
});

// DELETE request
app.delete('/testing/:roommate_id', (req, res) => {
    let deleteQuery = `DELETE FROM roommates WHERE roommate_id = ${req.params.roommate_id}`;

    client.query(deleteQuery, (err, result) => {
        if (!err) {
            res.send('Deletion was successful');
        } else {
            console.log(err.message);
        }
    });
});
