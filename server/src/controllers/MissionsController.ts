import { NextFunction, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

class UsersController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id
            const { name, experience, type } = req.body

            await prisma.mission.create({
                data: {
                    userId: userId,
                    name,
                    experience,
                    type
                }
            })

            return res.status(201).send()
        } catch (err) {
            next(err)
        }
    }
}

export { UsersController }
