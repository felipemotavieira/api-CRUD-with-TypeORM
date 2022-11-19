import { Router } from "express";
import createSessionController from "../controllers/createSessionController.controller";
import { createUserController } from "../controllers/createUserController.controller";
import deleteUserController from "../controllers/deleteUserController.controller";
import listUsersController from "../controllers/listUsersController.controller";
import updateUserController from "../controllers/updateUserController.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";


const router = Router()

router.post("", createUserController)
router.get("", ensureAuthMiddleware, listUsersController)
router.delete("/:id", ensureAuthMiddleware, deleteUserController)
router.patch("/:id", ensureAuthMiddleware, updateUserController)

export default router