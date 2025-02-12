const {pool} = require('../config/db');



async function getproducts(){
    try{
        const query = 'SELECT p.product_name , p.category , p.quantity , p.price , p.supplier_name , p.date_added, w.warehouse_id from products p join warehouse_inv w on p.warehouse_id = w.warehouse_id';
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


async function getproductswarehouse(warehouse_id){
    try{
  
        const [rows] = await pool.query('SELECT p.product_name , p.category , p.quantity , p.price , p.supplier_name , p.date_added, w.warehouse_id from products p join warehouse_inv w on p.warehouse_id = w.warehouse_id where w.warehouse_id = ?', [warehouse_id]); 
     

        return{
            success : true,
            data : rows,
        }
    }catch(err){
        console.log('DB Error : ', err);
        res.status(500).send('Internal Server Error');
    }
}





async function insertproduct(product_name, category , quantity , price , supplier_name , date_added, warehouse_id){
    try{

        const [existing] = await pool.query('SELECT * FROM products WHERE product_name = ? and warehouse_id = ?', [product_name, warehouse_id]);

        if (existing.length > 0){
            return{
                success : false,
                message : 'product already exists',
            }
        }

        const query = 'INSERT INTO products (product_name, category , quantity , price , supplier_name , date_added , warehouse_id) VALUES (?, ? , ? , ? ,?,?, ?)';
        await pool.query(query, [product_name, category , quantity , price , supplier_name , date_added , warehouse_id]);

        return{
            success : true,
            message : 'product added successfully',
        }
    }catch(err){
        console.log('DB Error : ', err);
        res.status(500).send('Internal Server Error');
    }

}

async function  updateproduct(product_id , warehouse_id){
    try{
        const [existing] = await pool.query('SELECT * FROM products WHERE product_id = ?', [product_id]);

        if (existing.length <= 0){
            return{
                success : false,
                message : 'product not exists',
            }
        }

        const query = 'UPDATE products SET warehouse_id = ? WHERE product_id = ?';
        await pool.query(query, [warehouse_id , product_id]);
        return{
            success : true,
            message : 'product updated successfully',
        }
    }catch(err){
        console.log('DB Error : ', err);
        res.status(500).send('Internal Server Error');
    }
    
}

module.exports = {insertproduct , getproducts ,updateproduct , getproductswarehouse};