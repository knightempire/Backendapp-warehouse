const mysql= require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
    DB_PORT ,

}  = process.env;


const dbconfig = {
    host : DB_HOST,
    port : DB_PORT,
    user : DB_USER,
    password : DB_PASSWORD,
    database : DB_DATABASE
}

const pool = mysql.createPool(dbconfig);

async function getConnection(){
    try{
        const connection = await pool.getConnection(async conn => conn);
        console.log('DB Connected');
        connection.release();
    }catch(err){
        console.log('DB Connection Error : ', err);
        return null;
    }
}

module.exports ={ pool , getConnection};