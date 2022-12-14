import 'express-async-errors'
import express from 'express'
import morgan from 'morgan'

import connectDB from './db/connect.js'
import products from './routes/products.js'

import notFound from './middleware/notFound.js'
import errorHandler from './middleware/errorHandler.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (_req, res) => {
  res.send('<h1>Store API</h1>')
})

app.use('/api/v1/products', products)


app.use(notFound)
app.use(errorHandler)


const PORT = 3000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => console.log(`Listening port ${PORT}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
