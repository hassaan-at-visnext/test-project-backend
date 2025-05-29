const { Model, DataTypes } = require("sequelize");

class Category extends Model { }

module.exports = (sequelize) => {
    Category.init({
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    }, {
        sequelize,
        modelName: "Category",
        tableName: "category",
        timestamps: false
    });

    return Category;
}