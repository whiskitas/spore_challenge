/**
 * @param {any} column
 * checa que la columa exista, si no devuelve un valor undefined, lo que hara que no se modifique la columna
 */
function hasColumn(requestBody) {
    return (requestBody ? requestBody : undefined)
}
const express = require('express')
const PositionRouter = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
module.exports = PositionRouter

PositionRouter.get('/:id', async (req, res, next) => {
    try {
        const car = await prisma.positions.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        })
        res.status(200).send(car)
    } catch (err) { next(err) }
})

PositionRouter.get('/', async (req, res, next) => {
    try {
        const cars = await prisma.positions.findMany()
        res.status(200).send(cars)
    } catch (err) { next(err) }
})

PositionRouter.post('/', async (req, res, next) => {
    try {
        const car = await prisma.positions.create({
            data: {
                car_id: parseInt(req.body.car_id),
                lat: parseFloat(req.body.lat),
                lon: parseFloat(req.body.lon),
            },
        })
        res.status(200).send(car)
    } catch (err) { next(err) }
})

PositionRouter.put('/', async (req, res, next) => {
    try {
        let id = req.body.id || req.params.id || req.query.id || undefined

        if (id === undefined) return res.status(400).json({ message: 'id not found in request' })
        const car = await prisma.positions.update({
            where: {
                id: parseInt(id),
            },
            data: {
                car_id: (req.body.car_id ? parseInt(req.body.car_id) : undefined),
                lon: hasColumn(req.body.lon),
                lat: hasColumn(req.body.lat),
            }
        })
        res.sendStatus(200)
    } catch (err) { next(err) }
})

PositionRouter.delete('/:key?', async (req, res, next) => {
    try {
        let id = req.body.id || req.params.id || req.query.id || undefined

        if (id === undefined) return res.status(400).json({ message: 'id not found in request' })
        const deleteCar = await prisma.positions.delete({
            where: {
                id: parseInt(id),
            }
        })
        res.status(200).send(deleteCar)
    } catch (err) { next(err) }

})