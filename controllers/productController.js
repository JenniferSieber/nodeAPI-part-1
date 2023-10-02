const Product = require('../models/productModel')
const express = require('express')
const asyncHandler = require('express-async-handler')

// GET all products from database
const getProducts = asyncHandler(async(req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products)

  }catch(err) {
    res.status(500)
    throw new Error(err.message)
  }
})

// GET single product from db
const getProduct = asyncHandler(async(req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id)
    res.status(200).json(product)

  }catch(err) {
    res.status(500)
    throw new Error(err.message)
  }
})

// POST new Product to DB
const createProduct = asyncHandler(async(req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)

  } catch(err) {
    res.status(500)
    throw new Error(err.message)
  }
})

// PUT update product in database
const updateProduct = asyncHandler(async(req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body)
    // product via id not in DB
    if(!product) {
      return res.status(404).json({ message: `cannot find product with ID: ${id}`})
    }
    const updatedProduct = await Product.findById(id)
    res.status(200).json(product)

  }catch(err) {
    res.status(500)
    throw new Error(err.message)
  }
})

// DELETE product in DB by ID
const deleteProduct = asyncHandler(async(req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id, req.body)
    if (!product) {
      return res.status(404).json({ message: `cannot find product with ID: ${id}`})
    }
    res.status(200).json(product)

  }catch(err) {
    res.status(500)
    throw new Error(err.message)
  }
})

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}