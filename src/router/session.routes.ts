import { Router } from "express";
import createSessionController from "../controllers/createSessionController.controller";
import { createUserController } from "../controllers/createUserController.controller";


const router = Router()

router.post("", createSessionController)

export default router