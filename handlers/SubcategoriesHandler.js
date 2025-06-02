const { db } = require("../helpers");

const Subcategory = db.Subcategory;

class SubcategoriesHandler {
    static async getAllSubcategoriesByParentId(parentId) {
        const subcategories = await Subcategory.findAll({
            where: {
                parent_id: parentId
            },
            order: [['subcategory_id', 'ASC']],
            raw: true,
            plain: false
        });

        return subcategories;
    }
}

module.exports = SubcategoriesHandler;