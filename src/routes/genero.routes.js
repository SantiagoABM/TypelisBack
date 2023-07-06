import { Router } from "express";
import { getGeneros, getGeneroById } from "../controllers/genero.controller";
import { isAdmin, verifyToken } from "../middlewares/authJwt";

const router = Router();

router.get('/', getGeneros);
router.get('/:generoId', [verifyToken, isAdmin], getGeneroById);


export default router;