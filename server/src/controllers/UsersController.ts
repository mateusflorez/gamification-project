import { NextFunction, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

class UsersController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email, password } = req.body

            const usernameCheck = await prisma.user.findUnique({ where: { username } })
            if (usernameCheck)
                return res.json({ message: "Username already used", status: false })

            const emailCheck = await prisma.user.findUnique({ where: { email } })
            if (emailCheck)
                return res.json({ message: "Email already used", status: false })

            const hashedPassword = await bcrypt.hash(password, 10)
            const user = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword
                }
            })
            return res.status(201).json({
                status: true,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            })
        } catch (err) {
            next(err)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body

            const user = await prisma.user.findUnique({ where: { username } })
            if (!user)
                return res.json({ message: "Incorrect username or password", status: false })

            const passwordCheck = await bcrypt.compare(password, user.password)
            if (!passwordCheck)
                return res.json({ message: "Incorrect username or password", status: false })

            return res.status(200).json({
                status: true,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            })
        } catch (err) {
            next(err)
        }
    }
}

export { UsersController }
