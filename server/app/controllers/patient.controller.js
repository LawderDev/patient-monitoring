const db = require('../models');
const Patient = db.patients;


// Définir une fonction pour émettre les patients triés
const emitSortedPatients = (eventName, socketio) => {
  Patient.findAll({ order: [['apointmentDate', 'ASC']] })
    .then(data => {
      socketio.emit(eventName, data);
    })
    .catch(err => {
      console.error(`Failed to emit sorted patients for ${eventName}:`, err);
    });
};

exports.emitSortedPatients = emitSortedPatients;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  console.log("req.body", req.body)

  const patient = {
    name: req.body.name,
    apointmentDate: req.body.apointmentDate,
    status: req.body.status,
  };

  Patient.create(patient)
    .then(data => {
      emitSortedPatients('updatedPatients', req.app.get('socketio'));
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Patient."
      });
    });
};

exports.findAllInApointmentDateOrder = (req, res) => {
    Patient.findAll({ order: [['apointmentDate', 'ASC']] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving patients."
      });
    });
}

exports.update = (req, res) => {
    const id = req.params.id;

    Patient.update(req.body, {
        where: { id: id }
    })
  .then(num => {
    if (num == 1) {
      emitSortedPatients('updatedPatients', req.app.get('socketio'));
      res.send({
        message: "Patient was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Patient with id=${id}. Maybe Patient was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Patient with id=" + id
    });
  });
};

exports.delete = (req, res) => {
    const id = req.params.id;

  Patient.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        emitSortedPatients('updatedPatients', req.app.get('socketio'));
        res.send({
          message: "Patient was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Patient with id=${id}. Maybe Patient was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Patient with id=" + id
      });
    });
};