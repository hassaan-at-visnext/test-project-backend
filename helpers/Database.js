const fs = require("fs");
const path = require("path");
const config = require("config");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  config.database.name,
  config.database.username,
  config.database.password,
  {
    sync: { force: true },
    host: config.database.host,
    dialect: config.database.client,
    ssl: true,
    pool: config.database.pool,
    logging: true
  }
)

const modelsPath = path.join(__dirname, '../models');

fs.readdirSync(modelsPath)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1 &&
      file !== "associations.js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(modelsPath, file))( 
    sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

console.log('Models loaded::',Object.keys(db).filter(key => key !== 'sequelize' && key !== 'Sequelize'));
  
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const applyAssociations = require('../models/associations');
applyAssociations(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;