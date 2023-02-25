import { Router } from "express";
import { UsersController } from "../controllers/UsersController";

const userRoutes = Router()
const usersController = new UsersController()

userRoutes.post("/new-mission/:id", usersController.register)

export { userRoutes }
