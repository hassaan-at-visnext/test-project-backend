const { Model, DataTypes } = require('sequelize');

class Product extends Model { }

module.exports = (sequelize) => {
    Product.init({
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull:false
        },
        moq: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        availability: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        subcategory_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        product_certifications: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        supplier_certifications: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        manufacturer_location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        stock_availability_in_us: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        image: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type:DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: "Product",
        tableName: "product",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    });

    return Product;
}