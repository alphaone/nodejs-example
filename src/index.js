const dotenv = require('dotenv');
const http = require('http');
const api = require('./api');

dotenv.config({ path: 'service.env' });
const port = process.env.PORT;
const server = http.createServer(api.app);
server.listen(port);
server.on('listening', onListening);

function onListening() {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.info(`Listening on ${bind}`)
}