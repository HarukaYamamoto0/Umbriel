import { Router } from "express";
import UserController from "../controllers/userController.js";

const router = Router();

const userController = new UserController();

// RESTFUL
router.get("/:email", userController.getUser)
router.post("/", userController.createUser)
router.put("/:email", userController.updateUser);
router.delete("/:email", userController.deleteUser);

export default router;
