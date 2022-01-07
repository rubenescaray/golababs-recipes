const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');

const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

connectDB()

const app = express()

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// CORS
app.use(cors())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/recipes', require('./routes/recipes'))

const PORT = 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))