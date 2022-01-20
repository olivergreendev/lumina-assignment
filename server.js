const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

// app.use(express.static('./dist/angular-lumina-assignment'));
app.use(express.static(path.join(__dirname, 'dist/angular-lumina-assignment')));

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'lumina'
// });
// connection.connect((err) => {
//     if (err) {
//         console.log('Error connecting to database: lumina');
//         return;
//     }
//     console.log('Connected to lumina.');
// });
// connection.query('SELECT * FROM users', (err, users) => {
//     if (err) throw err;
//     // console.log(users);
//     users.forEach((user) => {
//         console.log(`${user.firstName} id is ${user.id}`);
//     });
// });
// connection.end((err) => { })

// app.get('/users', (req, res) => {
//     res.json({message: 'OK'});
// });
app.get('*', (req, res) => {
    // res.sendFile('index.html', {root: 'dist/angular-lumina-assignment'});
    res.sendFile(path.join(__dirname, 'dist/angular-lumina-assignment/index.html'));
});

app.listen(port, (req, res) => {
    console.log(`Running on port ${port}`);
});