const { Op, where } = require('sequelize');
const { db } = require('../helpers');

const Category = db.Category;
const Subcategory = db.Subcategory;

class CategoriesHandler {

  static async searchCategories(name) {
    return await Category.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      },
      include: [{
        model: Subcategory,
        as: 'subcategories',
        required: false,
      }]
    });
  }

  static async searchSubcategories(name) {
    return await Subcategory.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      },
      include: [
        {
          model: Category,
          required: false
        },
        {
          model: Subcategory,
          as: 'parent',
          required: false
        },
        {
          model: Subcategory,
          as: 'children',
          required: false
        }
      ]
    });
  }

  static async getAllCategories() {
    return await Category.findAll();
  }

  static async getAllCategoriesAndSubcategories() {
    return await Category.findAll({
      include: [{
        model: Subcategory,
        as: 'subcategories',
        attributes: ['subcategory_id', 'name'],
        where: {
          parent_id: null
        }
      }],
      order: [
        ['category_id', 'ASC'],
        [{ model: Subcategory, as: 'subcategories' }, 'subcategory_id', 'ASC']
      ]
    });
  }
}

module.exports = CategoriesHandler;