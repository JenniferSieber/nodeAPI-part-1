require('dotenv').config({path: '.env'})
const express = require('express')
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoute')
const app = express()

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/api/products', productRoute);

// greeting
app.get('/', (req, res) => {
  res.send('Hello Node API from JenWebDev')
})




mongoose.connect(DB_URL)
  .then(()=> {
    console.log(`Connected to mongoDB`)
    app.listen(PORT, () => {
      console.log(`Node API app is running on port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(`Error: ${err}`)
  }) 