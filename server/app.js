require('dotenv').config()

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const OrderController = require('./controllers/orderController');
const ItemController = require('./controllers/itemController');

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
app.post('/login')
app.post('/add-user')

// orders
app.use(authentication)
app.post('/orders/:id', OrderController.addOrder)
app.put('/orders/:id', OrderController.updateOrder)
app.delete('/orders/:id')

app.use(errorHandler)

module.exports = app;