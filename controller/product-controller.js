const { QueryCursor } = require('mongoose');
const Product = require('../models/product-model');

const getAllProductsStatic = async (req, res) => {
    const search = 'a';
    const products = await Product.find({
        name: { $regex:search, $options:'i'}
    });
    res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort } = req.query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === 'true'
            ? true
            : false;
    }
    if (company) {
        queryObject.company === company;
    }
    if (name) {
        queryObject.name = name;
    }
    console.log(queryObject);
    let result = Product.find(queryObject);
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }

    const products = await result;
    res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
    getAllProducts,
    getAllProductsStatic
};