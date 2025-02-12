const {pool} = require('../config/db');



async function getWarehouses(){
    try{
        const query = 'SELECT * FROM warehouse_inv';
        const [rows] = await pool.query(query);

        return{
            success : true,
            data : rows,
        }
    }catch(err){
        console.log('DB Error : ', err);
        res.status(500).send('Internal Server Error');
    }
}

async function insertWarehouse(warehouse_name , warehouse_location){
    try{

        const [existing] = await pool.query('SELECT * FROM warehouse_inv WHERE warehouse_name = ?', [warehouse_name]);

        if (existing.length > 0){
            return{
                success : false,
                message : 'Warehouse already exists',
            }
        }

        const query = 'INSERT INTO warehouse_inv (warehouse_name , warehouse_location) VALUES (?, ?)';
        await pool.query(query, [warehouse_name , warehouse_location]);

        return{
            success : true,
            message : 'Warehouse added successfully',
        }
    }catch(err){
        console.log('DB Error : ', err);
        res.status(500).send('Internal Server Error');
    }

}

async function  updatewarehouse(warehouse_id , warehouse_name){
    try{
        const [existing] = await pool.query('SELECT * FROM warehouse_inv WHERE warehouse_id = ?', [warehouse_id]);

        if (existing.length <= 0){
            return{
                success : false,
                message : 'warehouse  not exists',
            }
        }

        const query = 'UPDATE warehouse_inv SET warehouse_name = ? WHERE warehouse_id = ?';
        await pool.query(query, [warehouse_id , warehouse_name]);
        return{
            success : true,
            message : 'Warehouse updated successfully',
        }
    }catch(err){
        console.log('DB Error : ', err);
        res.status(500).send('Internal Server Error');
    }
    
}

module.exports = {insertWarehouse , getWarehouses ,updatewarehouse};