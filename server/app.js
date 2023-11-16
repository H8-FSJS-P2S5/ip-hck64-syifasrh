require('dotenv').config()

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const OrderController = require('./controllers/orderController');
const ItemController = require('./controllers/itemController');
const UserController = require('./controllers/userController');

const PaymentController = require('./controllers/paymentController');

const { authentication } = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

const cors = require('cors');

// middleware body-parser
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//pub site
app.get('/items', ItemController.getAllItem)
app.get('/items/:id', ItemController.getItemById)

// auth
app.post('/login', UserController.login)
app.post('/add-user', UserController.register)

// auth
app.post('/auth/google', UserController.googleAuth)
app.use(authentication)

// orders
app.post('/orders/:id', OrderController.addOrder)
app.put('/orders/:id', OrderController.updateOrder)
app.delete('/orders/:id', OrderController.deleteOrder)

// shipping fee
app.get('/provinces', OrderController.getProvinces)
app.post('/cities', OrderController.getCities)
app.post('/cost', OrderController.getCost)

app.get('/payment/midtrans/token', PaymentController.getMidtransToken)

app.use(errorHandler)

module.exports = app;