const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes')

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS")
    next();
  });


app.use("/chat", routes);

app.use((req, res, next) => {
    console.error('Route not found');
    res.sendStatus(404);
})

const server = app.listen(9000, () => {
    console.log ("Server started on localhost:9000")
});
const io = require('socket.io').listen(server);
require('./sockets').up(io);
