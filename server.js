console.log('hello from: node server.js')

const express = require('express')
const app = express()

require('dotenv').config({path: '.env'})
const PORT = 3000

// Route to see server in browser
app.get('/', (req, res) => {
  res.send('Hello Node API')
})


app.listen(process.env.PORT, () => {
  console.log(`Node API app is running on port: ${PORT}`)
})
