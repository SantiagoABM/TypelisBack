import { Router } from "express";
import { getActores, createActor, getActorById, updateActorById, deleteActorById } from "../controllers/actor.controller";
import { isAdmin, verifyToken } from "../middlewares/authJwt";

const router = Router();

router.get('/', getActores);
router.post('/', [verifyToken, isAdmin], createActor);
router.get('/:actorId', getActorById);
router.put('/actor/:actorId', updateActorById);
router.delete('/delete/:actorId', deleteActorById);


export default router;