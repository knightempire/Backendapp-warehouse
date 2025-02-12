const {pool} = require('../config/db');



async function getWarehouses(){
    try{
        const query = 'SELECT * FROM warehouse';
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

async function insertWarehouse(product_name, category , quantity , price , supplier_name , date_added){
    try{

        const [existing] = await pool.query('SELECT * FROM warehouse WHERE product_name = ?', [product_name]);

        if (existing.length > 0){
            return{
                success : false,
                message : 'Warehouse already exists',
            }
        }

        const query = 'INSERT INTO warehouse (product_name, category , quantity , price , supplier_name , date_added) VALUES (?, ? , ? , ? ,?,?)';
        await pool.query(query, [product_name, category , quantity , price , supplier_name , date_added]);

        return{
            success : true,
            message : 'Warehouse added successfully',
        }
    }catch(err){
        console.log('DB Error : ', err);
        res.status(500).send('Internal Server Error');
    }

}

async function  updatewarehouse(product_id , quantity){
    try{
        const [existing] = await pool.query('SELECT * FROM warehouse WHERE product_id = ?', [product_id]);

        if (existing.length <= 0){
            return{
                success : false,
                message : 'product not exists',
            }
        }

        const query = 'UPDATE warehouse SET quantity = ? WHERE product_id = ?';
        await pool.query(query, [quantity , product_id]);
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