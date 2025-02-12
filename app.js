const express = require('express');
const dotenv = require('dotenv');
const { getConnection } = require('./config/db');

const cors = require('cors');
const app = express();


const warehouseRouter = require('./router/warehouse.router');
const warehosue_inv = require('./router/warehouse_new_router')
const product = require('./router/product.router')

app.use(express.json());
app.use(cors());

const PORT = 3008;


(async () => {
await getConnection();
})();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/warehouse', warehouseRouter);
app.use('/warehouse_inv', warehosue_inv)
app.use('/product',product)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});