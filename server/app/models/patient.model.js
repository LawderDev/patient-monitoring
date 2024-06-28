module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define("patient", {
    name: {
      type: Sequelize.STRING
    },
    apointmentDate: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    }
  });

  return Patient;
};