const { Model, DataTypes } = require("sequelize");

class User extends Model {}

module.exports = (sequelize) => {
    User.init({
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        company_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        country: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        email: {
            type:DataTypes.STRING(255),
            allowNull:false,
            unique: true
        },
        password:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        login_token: {
            type: DataTypes.STRING,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },{
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    });

    return User;
}