const { Op, where } = require('sequelize');
const { db } = require('../helpers');

const Category = db.Category;
const Subcategory = db.Subcategory;

class CategoriesHandler {

    static async Search(name) {
        const categories = await Category.findAll({
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

        const filteredCategories = categories.map(category => {
            const filteredSubcategories = category.subcategories
                ? category.subcategories.filter(sub => sub.name.toLowerCase().includes(name.toLowerCase()))
                : [];

            return {
                ...category.get({ plain: true }),
                subcategories: filteredSubcategories.map(sub => sub.get({ plain: true }))
            };
        });


        const subcategories = await Subcategory.findAll({
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

        return {
            categories: filteredCategories,
            subcategories: subcategories.map(sc => sc.get({ plain: true }))
        };
    }

    static async getAllCategories() {
        const categories = await Category.findAll();
        return categories.map(category => category.get({ plain: true }));
    }

    static async getAllCategoriesAndSubcategories() {
        const categories = await Category.findAll({
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

        return categories.map(category => category.get({ plain: true }));
    }
}

module.exports = CategoriesHandler;