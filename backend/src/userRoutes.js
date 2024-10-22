/**
 * @param {any} column
 * checa que la columa exista, si no devuelve un valor undefined, lo que hara que no se modifique la columna
 */
function hasColumn(requestBody) {
    return (requestBody ? requestBody : undefined)
}
const express = require('express')
const UserRouter = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
module.exports = UserRouter


UserRouter.get('/:id', async (req, res, next) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: parseInt(req.params.id),
            }, include: {
                Cars: {
                    include: {
                        Positions: { orderBy: { id: 'desc', }, take: 1 }
                    }
                }
            }
        })
        // console.log(user)
        res.status(200).send(user)
    } catch (err) { next(err) }
})

UserRouter.get('/', async (req, res, next) => {
    try {
        const users = await prisma.users.findMany({
            include: {
                Cars: {
                    include: {
                        Positions: { orderBy: { id: 'desc', }, take: 1 }
                    }
                }
            }
        })
        res.status(200).send(users)
    } catch (err) { next(err) }
})

UserRouter.post('/login', async (req, res, next) => {
    try {
        const user = await prisma.users.findMany({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        })
        console.log(user[0])
        if (user.length > 0)
            res.status(200).send({ token: "esto deberia ser un JWT", code: 200, is_admin: user[0].is_admin,id: user[0].id})
        else
            res.status(404).send({})
    } catch (err) { next(err) }
})

UserRouter.post('/', async (req, res, next) => {
    try {
        const user = await prisma.users.create({
            data: {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                is_admin: req.body.is_admin
            },
        })
        res.status(200).send(user)
    } catch (err) { next(err) }
})

UserRouter.put('/', async (req, res, next) => {
    try {
        let id = req.body.id || req.params.id || req.query.id || undefined

        if (id === undefined)
            return res.status(400).json({ message: 'id not found in request' });
        const user = await prisma.users.update({
            where: {
                id: parseInt(id),
            },
            data: {
                username: hasColumn(req.body.username),
                password: hasColumn(req.body.password),
                email: hasColumn(req.body.email),
                is_admin: hasColumn(req.body.is_admin)
            }
        })
        res.sendStatus(200)
    } catch (err) { next(err) }
})

UserRouter.delete('/:key?', async (req, res, next) => {
    try {
        let id = req.body.id || req.params.id || req.query.id || undefined

        if (id === undefined)
            return res.status(400).json({ message: 'id not found in request' });
        const deleteUser = await prisma.users.delete({
            where: {
                id: parseInt(id),
            }
        })
        res.status(200).send(deleteUser)
    } catch (err) { next(err) }

})