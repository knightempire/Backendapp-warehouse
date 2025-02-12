const express = require('express');
const {getproducts , insertproduct , updateproduct , getproductswarehouse} = require('../controllers/product.controller');

const product = express.Router();

product.get('/get' , async (req, res) => {
    const result = await getproducts();
    res.json(result);
});

product.post('/add' , async (req, res) => {        
    const {product_name, category , quantity , price , supplier_name , date_added , warehouse_id} = req.body;
    const result = await insertproduct(product_name, category , quantity , price , supplier_name , date_added,warehouse_id);
    res.json(result);
});


product.post('/update' , async (req, res) => {
    const {product_id , warehouse_id} = req.body;
    const result = await updateproduct(product_id , warehouse_id);
    res.json(result);
});


product.post('/getbyware' , async (req, res) => {
    const {warehouse_id} = req.body;
    const result = await getproductswarehouse(warehouse_id);
    res.json(result);
});

module.exports = product;