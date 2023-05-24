import { Router } from "express";
import {
  getPeliculas,
  createPelicuas,
  updatePeliculaById,
  deletePeliculaById,
  getPeliculaById,
  likePelicula,
  unlikePelicula
} from "../controllers/peliculas.controller.js";
import { verifyToken, isModerator, isAdmin, isPremium } from "../middlewares/authJwt.js";

const router = Router();

router.get("/", getPeliculas);

router.get("/:peliculaId", getPeliculaById);

router.post('/:usuarioId/like/:peliculaId', [verifyToken], likePelicula);

router.post('/:usuarioId/unlike/:peliculaId', [verifyToken], unlikePelicula);

router.post("/", [verifyToken, isModerator], createPelicuas);

router.put("/:peliculaId", [verifyToken, isModerator], updatePeliculaById);

router.delete("/:peliculaId", [verifyToken, isAdmin], deletePeliculaById);

export default router;