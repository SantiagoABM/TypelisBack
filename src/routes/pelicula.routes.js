import { Router } from "express";
import {
  getPeliculas,
  createPelicula,
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

router.delete('/:usuarioId/unlike/:peliculaId', [verifyToken], unlikePelicula);

router.post("/", [verifyToken, isModerator], createPelicula);

router.put("/:peliculaId", [verifyToken, isModerator], updatePeliculaById);

router.delete("/:peliculaId", [verifyToken, isAdmin], deletePeliculaById);

export default router;