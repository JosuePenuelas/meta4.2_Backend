'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Activo.belongsToMany(models.Tag, { through: models.ActivoTags });
      models.Activo.belongsTo(models.Ubicacion, { foreignKey: 'ubicacion' });
      models.Activo.belongsTo(models.Responsable, { foreignKey: 'responsable' });
    }
  }
  Activo.init({
    numSerie: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    numInventario: { type: DataTypes.INTEGER, unique: true },
    descripcion: { type: DataTypes.STRING, allowNull: false },
    ubicacion: DataTypes.INTEGER,
    responsable: DataTypes.INTEGER,
    imagen: { type: DataTypes.BLOB('long'), allowNull: true }
  }, {
    sequelize,
    modelName: 'Activo',
  });

  return Activo;
};