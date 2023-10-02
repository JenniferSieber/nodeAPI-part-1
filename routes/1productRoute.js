// product routes
const express = require('express')
const router = express.Router()
const Product = require('../models/productModel')

router.get('/', async (req, res) => {
  try {
    // holds value of all products in db
    const products = await Product.find({})
    res.status(200).json(products)
  }catch(err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch(err) {
    console.log(err.message)
    res.status(500).json({message: error.message })
  }
})

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

module.exports = router