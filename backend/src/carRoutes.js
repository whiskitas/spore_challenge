/**
 * @param {any} column
 * checa que la columa exista, si no devuelve un valor undefined, lo que hara que no se modifique la columna
 */
function hasColumn(requestBody) {
    return (requestBody ? requestBody : undefined)
}
const express = require('express')
const CarRouter = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
module.exports = CarRouter

CarRouter.get('/:id', async (req, res, next) => {
    try {
        const car = await prisma.cars.findUnique({
            where: {
                id: parseInt(req.params.id),
            }, include: {
                Positions: { orderBy: { id: 'desc', }, take: 1 }
            }
        })
        // console.log(user)
        res.status(200).send(car)
    } catch (err) { next(err) }
})

CarRouter.get('/', async (req, res, next) => {
    try {
        const cars = await prisma.cars.findMany({
            include: {
                Positions: { orderBy: { id: 'desc', }, take: 1 }
            }
        })
        res.status(200).send(cars)
    } catch (err) { next(err) }
})

CarRouter.post('/', async (req, res, next) => {
    try {
        const car = await prisma.cars.create({
            data: {
                user_id: parseInt(req.body.user_id),
                plate: req.body.plate,
                make: req.body.make,
                model: req.body.model,
                color: req.body.color,
                Positions: { // Create an associated position
                    create: {
                        lat: 0, // Set latitude to 0
                        lon: 0, // Set longitude to 0
                    },
                },
            },
        })
        res.status(200).send(car)
    } catch (err) { next(err) }
})

CarRouter.put('/', async (req, res, next) => {
    try {
        let id = req.body.id || req.params.id || req.query.id || undefined

        if (id === undefined) return res.status(400).json({ message: 'id not found in request' })
        const car = await prisma.cars.update({
            where: {
                id: parseInt(id),
            },
            data: {
                user_id: (req.body.user_id ? parseInt(req.body.user_id) : undefined),
                plate: hasColumn(req.body.plate),
                make: hasColumn(req.body.make),
                model: hasColumn(req.body.model),
                color: hasColumn(req.body.color),
            }
        })
        res.sendStatus(200)
    } catch (err) { next(err) }
})

CarRouter.delete('/:key?', async (req, res, next) => {
    try {
        let id = req.body.id || req.params.id || req.query.id || undefined

        if (id === undefined) return res.status(400).json({ message: 'id not found in request' })
        const deleteCar = await prisma.cars.delete({
            where: {
                id: parseInt(id),
            }
        })
        res.status(200).send(deleteCar)
    } catch (err) { next(err) }

})