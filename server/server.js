const http = require('http');
const app = require('./app');
const config = require('./configs/server.json');

const server = http.createServer(app);

const PORT = process.env.PORT || config.PORT;
const HOST = process.env.HOST || config.HOST;

server.listen(PORT, HOST, () => {
  console.log(`server started on ${HOST}:${PORT}`);
});