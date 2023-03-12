let http = require('http'),
    fs = require('fs'),
    path = require('path');

function serveFile(response, filePath) {
    fs.readFile(filePath, function (err, content) {
        if (err) {
            response.writeHead(404);
            response.end();
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(content, 'utf-8');
        }
    });
}

http.createServer(function (request, response) {
    let pathname = request.url;
    if (pathname === '/') {
        serveFile(response, './index.html');
    } else if (pathname === '/create') {
        serveFile(response, './create.html');
    } else if (pathname === '/search') {
        serveFile(response, './search.html');
    } else {
        serveFile(response, './not-found.html');
    }
}).listen(8000);
