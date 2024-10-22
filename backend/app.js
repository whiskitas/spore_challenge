const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res, next) => {
    try {
        res.send('Hello World!')
    } catch (err) { next(err) }
})

const UserRouter = require('./src/userRoutes.js')
const CarRouter = require('./src/carRoutes.js')
const PostionRouter = require('./src/positionRoutes.js')
app.use('/user', UserRouter)
app.use('/car', CarRouter)
app.use('/position', PostionRouter)

app.use((err, req, res, next) => {
    console.error("error", err); 
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})