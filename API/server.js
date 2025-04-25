import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())
app.use(cors())

app.post('/users', async (req, res) => {
    await prisma.user.create({
        data: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
        }
    })
    res.status(201).json(req.body)
})

app.delete('/users/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: "Usúario foi deletado com sucesso!" })
})
app.put('/users/:id', async (req, res) => {
    const usuarioAtualizado = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
        }
    })
    res.status(201).json(usuarioAtualizado)
})

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            age: true,
            email: true,
            consent: {
                select: {
                    id: true,
                    consent_date: true,
                    revoked: true,
                    finalidade: true
                }
            }
        }
    });
    res.status(200).json(users);
});


app.post('/consentimentos', async (req, res) => {
    const novoConsentimento = await prisma.consentimento.create({
        data: {
            userId: req.body.userId,
            finalidadeId: req.body.finalidadeId
        }
    })
    res.status(201).json(novoConsentimento)
})

app.get('/consentimentos/:userId', async (req, res) => {
    const consentimentos = await prisma.consentimento.findMany({
        where: {
            userId: req.params.userId
        }
    })
    res.status(200).json(consentimentos)
})

app.put('/consentimentos/revogar', async (req, res) => {
    const existente = await prisma.consentimento.findFirst({
        where: {
            userId: req.body.userId,
            finalidadeId: req.body.finalidadeId,
            revoked: false
        }
    })
    if (!existente) {
        return res.status(404).json({ message: "Consentimento não encontrado." })
    }
    const revoked = await prisma.consentimento.update({
        where: { id: existente.id },
        data: {
            revoked: true,
            revoked_date: new Date()
        }
    })
    res.status(200).json({ message: "Consentimento revogado com sucesso!", revoked })
})

app.post('/finalidades', async (req, res) => {
    const finalidade = await prisma.finalidade.create({
        data: {
            title: req.body.title,
            description: req.body.description
        }
    })
    res.status(201).json(finalidade)
})

app.get('/finalidades', async (req, res) => {
    const finalidades = await prisma.finalidade.findMany()
    res.status(200).json(finalidades)
})

app.delete('/finalidades/:id', async (req, res) => {
    const finalidadeId = req.params.id;

    await prisma.consentimento.deleteMany({
        where: {
            finalidadeId: finalidadeId
        }
    });

    await prisma.finalidade.delete({
        where: {
            id: finalidadeId
        }
    });

    res.status(200).json({ message: "A finalidade foi deletada com sucesso!" });
});


app.listen(3000)

