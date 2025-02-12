const express = require('express');
const {getWarehouses , insertWarehouse , updatewarehouse} = require('../controllers/warehouse.controller');

const warehosue = express.Router();

warehosue.get('/get' , async (req, res) => {
    const result = await getWarehouses();
    res.json(result);
});

warehosue.post('/add' , async (req, res) => {        
    const {product_name, category , quantity , price , supplier_name , date_added} = req.body;
    const result = await insertWarehouse(product_name, category , quantity , price , supplier_name , date_added);
    res.json(result);
});


warehosue.post('/update' , async (req, res) => {
    const {product_id , quantity} = req.body;
    const result = await updatewarehouse(product_id , quantity);
    res.json(result);
});

module.exports = warehosue;