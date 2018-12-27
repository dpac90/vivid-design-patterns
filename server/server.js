const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;
const staticPath = `${__dirname}/static`;

app.use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(express.static(staticPath))
    .set('port', port)
    .get('*', function(req, res) {
        res.sendFile(`${staticPath}/index.html`);
    });

// start server
let server = http.createServer(app);

server.listen(port).on('listening', onListening);

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

    console.info(`Node Service listening on ${bind}`);
}
