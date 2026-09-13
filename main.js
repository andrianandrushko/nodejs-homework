const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        data: 'Hello World!',
        sum:23,
        num:'Hello coding'
    }));
});

server.listen(3000);
setTimeout(() => {
    server.close(() => {
        console.log('server on port 3000 closed successfully');
    });
}, 10000);
