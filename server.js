const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/productModel')
const app = express()

require('dotenv').config({path: '.env'})
const PORT = 3000


app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
  res.send('Hello Node API from JenWebDev')
})

app.get('/products', async (req, res) => {
  try {
    // holds value of all products in db
    const products = await Product.find({})
    res.status(200).json(products)
  }catch(err) {
    res.status(500).json({ message: err.message })
  }
})

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

app.post('/product', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch(err) {
    console.log(err.message)
    res.status(500).json({message: error.message })
  }
})



app.put('/products/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body)
    if(!product) {
      return res.status(404).json({ message: `cannot find product with ID: ${id}`})
    }

    res.status(200).json(product)
  }catch(err) {
    res.status(500).json({ message: err.message })
  }
})


app.delete('/products/:id', async (req, res) => {
  try {
 
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id, req.body)
    if (!product) {
      return res.status(404).json({ message: `cannot find product with ID: ${id}`})
    }

    res.status(200).json(product)
  }catch(err) {
    res.status(500).json({ message: err.message })
  }
})


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