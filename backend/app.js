const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
require('dotenv/config');

app.use(cors());
app.options('*', cors);

// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

//Routes
const usersRoutes = require('./routers/users');
const categoriesRoutes = require('./routers/categories');
const productsRoutes = require('./routers/products');
const ordersRoutes = require('./routers/orders');

const api = process.env.API_URL;

app.use(`${api}/users`, usersRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/orders`, ordersRoutes);

mongoose
    .connect(process.env.CONNECTION_STRING, {
        dbName: 'NerdStore',
    })
    .then(() => {
        console.log('Database connection is ready...');
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(3000, () => {
    console.log('Server now running on http://localhost:3000');
});
