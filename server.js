const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('./dist/angular-lumina-assignment'));

app.get('/*', (req, res) => {
    res.sendFile('index.html', {root: 'dist/angular-lumina-assignment'});
});

app.listen(port, (req, res) => {
    console.log(`Running on port ${port}`);
});