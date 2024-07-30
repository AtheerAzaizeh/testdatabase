const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Worker = require('./worker');

const Education = sequelize.define('Education', {
  EducationID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  WorkerID: { type: DataTypes.INTEGER, allowNull: false, references: { model: Worker, key: 'WorkerID' } },
  CountryOfStudy: { type: DataTypes.STRING },
  InstitutionName: { type: DataTypes.STRING },
  Degree: { type: DataTypes.STRING },
  FieldOfStudy: { type: DataTypes.STRING },
  StartDate: { type: DataTypes.DATE },
  EndDate: { type: DataTypes.DATE },
  CertificateFile: { type: DataTypes.STRING },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

Education.associate = models => {
  Education.belongsTo(models.Worker, { foreignKey: 'WorkerID', as: 'worker' });
};

module.exports = Education;
