module.exports = (db) => {

  if (!db.Category || !db.Subcategory || !db.Product) {
    console.log('Error:: Required models not found in db object');
    console.log('Available models:: ', Object.keys(db).filter(key => key !== 'sequelize' && key !== 'Sequelize'));
    return;
  }

  const { Category, Subcategory, Product } = db;

  Category.hasMany(Subcategory, {
    foreignKey: 'category_id',
    as: 'subcategories'
  });

  Subcategory.belongsTo(Category, {
    foreignKey: 'category_id'
  });

  Subcategory.hasMany(Subcategory, {
    foreignKey: 'parent_id',
    as: 'children'
  });

  Subcategory.belongsTo(Subcategory, {
    foreignKey: 'parent_id',
    as: 'parent'
  });

  Subcategory.hasMany(Product, {
    foreignKey: 'subcategory_id',
    as: 'products'
  });

  Product.belongsTo(Subcategory, {
    foreignKey: 'subcategory_id'
  });
}