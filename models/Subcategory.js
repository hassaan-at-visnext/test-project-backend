const { Model, DataTypes } = require("sequelize");

class Subcategory extends Model { }

module.exports = (sequelize) => {
  Subcategory.init({
    subcategory_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: "Subcategory",
    tableName: "subcategory",
    timestamps: false
  });

  return Subcategory;
}