const cors = require('cors');
const express = require('express');
const { Server } = require('socket.io');
const { emitSortedPatients } = require('./app/controllers/patient.controller');
const http = require('http');

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
//{ force: true } to drop db
db.sequelize.sync({ force: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./app/routes/patient.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
const httpServer = new http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');
  emitSortedPatients('updatedPatients', io);
  socket.on('disconnect', () => {
    console.log('Un utilisateur est déconnecté');
  });
});


httpServer.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});

app.set('socketio', io);