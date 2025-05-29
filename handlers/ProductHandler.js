const { db } = require("../helpers");

const { Product, Subcategory } = db;

class ProductHandler {
    static async search(categoryId, productName, page, limit) {
        const offset = (page - 1) * limit;

        const whereCondition = {};

        if (productName) {
            whereCondition.name = {
                [Op.iLike]: `%${productName}%`  // Case-insensitive partial match
            };
        }

        const products = await Product.findAll({
            where: whereCondition,
            include: [
                {
                    model: Subcategory,
                    where: { category_id: categoryId },
                    attributes: []
                }
            ],
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [["created_at", "DESC"]]
        });

        return products.map(p => p.get({ plain: true }));
    }

    static async fetchById(productId) {
        const product = await Product.findOne({ where: { product_id: productId } });
        return product ? product.get({ plain: true }) : null;
    }

    static async fetchByCategory(categoryId, page, limit) {
        const offset = (page - 1) * limit;
        const products = await Product.findAll({
            include: [{
                model: Subcategory,
                where: { category_id: categoryId },
                attributes: []
            }],
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [["created_at", "DESC"]]
        });

        return products.map(p => p.get({ plain: true }));
    }

    static async fetchBySubcategory(subcategoryId, page, limit) {
        const offset = (page - 1) * limit;

        const products = await Product.findAll({
            where: { subcategory_id: subcategoryId },
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [["created_at", "DESC"]]
        });

        return products.map(p => p.get({ plain: true }));
    }
}

module.exports = ProductHandler;