const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

function serveFile(response, filePath) {
    fs.readFile(filePath, function (err, content) {
        if (err) {
            response.status(404).end();
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/html',
                'Access-Control-Allow-Origin': '*',
            });
            response.end(content, 'utf-8');
        }
    });
}

app.get('/', function (req, res) {
    serveFile(res, path.join(__dirname, 'index.html'));
});

app.get('/create', function (req, res) {
    serveFile(res, path.join(__dirname, 'create.html'));
});

app.get('/search', function (req, res) {
    serveFile(res, path.join(__dirname, 'search.html'));
});

app.get('*', function (req, res) {
    serveFile(res, path.join(__dirname, 'not-found.html'));
});

app.listen(8000, function () {
    console.log('Server listening on port 8000');
});
