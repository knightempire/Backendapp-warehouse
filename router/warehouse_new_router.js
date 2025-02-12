const express = require('express');
const {getWarehouses , insertWarehouse , updatewarehouse} = require('../controllers/warehouse_new.controller');

const warehosue_inv = express.Router();

warehosue_inv.get('/get' , async (req, res) => {
    const result = await getWarehouses();
    res.json(result);
});

warehosue_inv.post('/add' , async (req, res) => {        
    const {warehouse_name , warehouse_location} = req.body;
    const result = await insertWarehouse(warehouse_name , warehouse_location);
    res.json(result);
});


warehosue_inv.post('/update' , async (req, res) => {
    const {warehouse_id , warehouse_name} = req.body;
    const result = await updatewarehouse(warehouse_id , warehouse_name);
    res.json(result);
});

module.exports = warehosue_inv;