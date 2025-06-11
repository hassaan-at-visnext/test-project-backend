const { db } = require("../helpers");
const { Op } = require('sequelize');

const { Product, Subcategory } = db;

class ProductHandler {
    static async getAllProducts(page, limit, product_certifications, supplier_certifications, manufacturer_location, stock_availability_in_us, moq, priceFrom, priceTo) {
        const offset = (Number(page) - 1) * Number(limit);
        const whereClause = {};

        if (manufacturer_location) {
            whereClause.manufacturer_location = manufacturer_location;
        }

        if (stock_availability_in_us !== null && typeof stock_availability_in_us === 'boolean') {
            whereClause.stock_availability_in_us = stock_availability_in_us;
        }

        if (product_certifications && product_certifications.length > 0) {
            whereClause.product_certifications = {
                [Op.contains]: product_certifications
            };
        }

        if (supplier_certifications && supplier_certifications.length > 0) {
            whereClause.supplier_certifications = {
                [Op.contains]: supplier_certifications
            };
        }

        if (moq !== null && typeof moq === 'number') {
            whereClause.moq = {
                [Op.lte]: moq
            };
        }

        // Add price range filter
        if (priceFrom !== null && priceTo !== null) {
            whereClause.price = {
                [Op.between]: [priceFrom, priceTo]
            };
        }

        const result = await Product.findAndCountAll({
            where: whereClause,
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [["created_at", "DESC"]]
        });

        const products = result.rows.map(p => p.get({ plain: true }));
        const totalItems = result.count;
        const totalPages = Math.ceil(totalItems / limit);

        return {
            data: products,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages,
                totalItems
            }
        };
    }

    // static async search(categoryId, productName, page, limit) {
    //     const offset = (page - 1) * limit;

    //     const whereCondition = {};

    //     if (productName) {
    //         whereCondition.name = {
    //             [Op.iLike]: `%${productName}%`  // Case-insensitive partial match
    //         };
    //     }

    //     const products = await Product.findAll({
    //         where: whereCondition,
    //         include: [
    //             {
    //                 model: Subcategory,
    //                 where: { category_id: categoryId },
    //                 attributes: []
    //             }
    //         ],
    //         offset: parseInt(offset),
    //         limit: parseInt(limit),
    //         order: [["created_at", "DESC"]]
    //     });

    //     return products.map(p => p.get({ plain: true }));
    // }

    static async search(categoryId, productName, page, limit) {
        const offset = (page - 1) * limit;

        const whereCondition = {};
        if (productName) {
            whereCondition.name = {
                [Op.iLike]: `%${productName}%`
            };
        }

        const products = await Product.findAll({
            where: whereCondition,
            include: [
                {
                    model: Subcategory,
                    required: true, 
                    where: {
                        category_id: categoryId
                    },
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

    static async fetchByCategory(categoryId, page, limit, product_certifications, supplier_certifications, manufacturer_location, stock_availability_in_us, moq, priceFrom, priceTo) {
        const offset = (Number(page) - 1) * Number(limit);
        const whereClause = {};

        if (manufacturer_location) {
            whereClause.manufacturer_location = manufacturer_location;
        }

        if (stock_availability_in_us !== null && typeof stock_availability_in_us === 'boolean') {
            whereClause.stock_availability_in_us = stock_availability_in_us;
        }

        if (product_certifications && product_certifications.length > 0) {
            whereClause.product_certifications = {
                [Op.contains]: product_certifications
            };
        }

        if (supplier_certifications && supplier_certifications.length > 0) {
            whereClause.supplier_certifications = {
                [Op.contains]: supplier_certifications
            };
        }

        if (moq !== null && typeof moq === 'number') {
            whereClause.moq = {
                [Op.lte]: moq
            };
        }

        // Add price range filter
        if (priceFrom !== null && priceTo !== null) {
            whereClause.price = {
                [Op.between]: [priceFrom, priceTo]
            };
        }

        const result = await Product.findAndCountAll({
            where: whereClause,
            include: [{
                model: Subcategory,
                where: { category_id: categoryId },
                attributes: []
            }],
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [["created_at", "DESC"]]
        });

        const products = result.rows.map(p => p.get({ plain: true }));
        const totalItems = result.count;
        const totalPages = Math.ceil(totalItems / limit);

        return {
            data: products,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages,
                totalItems
            }
        };
    }

    static async fetchBySubcategory(subcategoryId, page, limit, product_certifications, supplier_certifications, manufacturer_location, stock_availability_in_us, moq, priceFrom, priceTo) {
        const offset = (Number(page) - 1) * Number(limit);
        const whereClause = { subcategory_id: subcategoryId };

        if (manufacturer_location) {
            whereClause.manufacturer_location = manufacturer_location;
        }

        if (stock_availability_in_us !== null && typeof stock_availability_in_us === 'boolean') {
            whereClause.stock_availability_in_us = stock_availability_in_us;
        }

        if (product_certifications && product_certifications.length > 0) {
            whereClause.product_certifications = {
                [Op.contains]: product_certifications
            };
        }

        if (supplier_certifications && supplier_certifications.length > 0) {
            whereClause.supplier_certifications = {
                [Op.contains]: supplier_certifications
            };
        }

        if (moq !== null && typeof moq === 'number') {
            whereClause.moq = {
                [Op.lte]: moq
            };
        }

        // Add price range filter
        if (priceFrom !== null && priceTo !== null) {
            whereClause.price = {
                [Op.between]: [priceFrom, priceTo]
            };
        }

        const result = await Product.findAndCountAll({
            where: whereClause,
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [["created_at", "DESC"]]
        });

        const products = result.rows.map(p => p.get({ plain: true }));
        const totalItems = result.count;
        const totalPages = Math.ceil(totalItems / limit);

        return {
            data: products,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages,
                totalItems
            }
        };
    }
}

module.exports = ProductHandler;