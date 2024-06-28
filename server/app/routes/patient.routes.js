module.exports = app => {
  const patients = require("../controllers/patient.controller.js");

  var router = require("express").Router();

  router.post("/", patients.create);

  router.get("/findAllInApointmentDateOrder", patients.findAllInApointmentDateOrder);

  router.put("/:id", patients.update);

  router.delete("/:id", patients.delete);

  app.use('/api/patients', router);
};