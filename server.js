const http = require('http')
const app = require('./app')

const PORT = process.env.PORT || 1997  

const server = http.createServer(app);

server.listen(PORT)