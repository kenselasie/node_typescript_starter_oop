import { Router } from "express";
import { UsersController } from '../controllers/UsersController'
const router = Router();



router.get("/", UsersController.getAllUser);


export default router;
