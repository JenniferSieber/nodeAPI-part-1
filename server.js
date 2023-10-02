const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/productModel')
const app = express()

require('dotenv').config({path: '.env'})
const PORT = 3000

// middleware so app knows how to use JSON
app.use(express.json())
// middleware so app knows how to use formurlencoded
app.use(express.urlencoded({ extended: false }))


// Route to see server in browser
app.get('/', (req, res) => {
  res.send('Hello Node API from JenWebDev')
})

// Route to fetch/get products from DB
app.get('/products', async (req, res) => {
  try {
    // holds value of all products in db
    const products = await Product.find({})
    res.status(200).json(products)
  }catch(err) {
    res.status(500).json({ message: err.message })
  }
})

// Route to fetch/GET single product by id from DB
app.get('/products/:id', async (req, res) => {
  try {
    //deconstruct id from req.params
    const {id} = req.params;
    // holds value of all products in db
    const product = await Product.findById(id)
    res.status(200).json(product)
  }catch(err) {
    res.status(500).json({ message: err.message })
  }
})

// Route POST save product to database
app.post('/product', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch(err) {
    console.log(err.message)
    res.status(500).json({message: error.message })
  }
})


// Route to PUT change single product by id in DB
app.put('/products/:id', async (req, res) => {
  try {
    //deconstruct id from req.params
    const {id} = req.params;

    // holds value of all products in db- req.body from client
    const product = await Product.findByIdAndUpdate(id, req.body)

    // verify if product exists to update
    if(!product) {
      return res.status(404).json({ message: `cannot find product with ID: ${id}`})
    }

    // if product updated successfully
    res.status(200).json(product)
  }catch(err) {
    res.status(500).json({ message: err.message })
  }
})

// Remove DELETE product via id
app.delete('/products/:id', async (req, res) => {
  try {
    //deconstruct id from req.params
    const {id} = req.params;
    // find id want to delete
    const product = await Product.findByIdAndDelete(id, req.body)
    // verify product in database
    if (!product) {
      return res.status(404).json({ message: `cannot find product with ID: ${id}`})
    }

    // if product deleted successfully
    res.status(200).json(product)
  }catch(err) {
    res.status(500).json({ message: err.message })
  }
})


//Connect DB and the server
mongoose.connect(process.env.DB_STRING)
  .then(()=> {
    console.log(`Connected to mongoDB`)
    app.listen(process.env.PORT, () => {
      console.log(`Node API app is running on port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(`Error: ${err}`)
  }) 