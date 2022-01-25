const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist/angular-lumina-assignment')));

// MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'lumina'
});
// GET: retrieve data on all users
app.get('/api/users', (req, res) => {
  let sql = `SELECT * FROM users`;
  connection.query(sql, (err, users) => {
      if (err) throw err;
      res.json(users);
  });
});
// PUT: update a users favourite movies
app.put('/api/movies/:id', (req, res) => {
  let sql = `UPDATE users SET favourite_movies = '${req.body.movies}' WHERE id = ${req.params.id}`;
  connection.query(sql, [req.body, req.params.id], (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});
// POST: create a user
app.post('/api/user', (req, res) => {
  let sql = `INSERT INTO users (firstName,lastName,favourite_movies) VALUES ('${req.body.firstName}', '${req.body.lastName}', '${req.body.favouriteMovies}')`;
  connection.query(sql, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});
app.delete('/api/user/:id', (req, res) => {
  let sql = `DELETE FROM users WHERE id = ${req.params.id};`;
  connection.query(sql, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/angular-lumina-assignment/index.html'));
});

app.listen(port, (req, res) => {
    console.log(`Live on port ${port}`);
});