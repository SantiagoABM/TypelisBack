import { Router } from "express";
import {
  getPeliculas,
  createPelicula,
  updatePeliculaById,
  deletePeliculaById,
  getPeliculaById,
  likePelicula,
  unlikePelicula,
  reproducirPelicula
} from "../controllers/peliculas.controller.js";
import { verifyToken, isModerator, isAdmin, isPremium } from "../middlewares/authJwt.js";
const router = Router();

router.get("/", getPeliculas);

router.get("/:peliculaId", getPeliculaById);

router.post('/:userId/:peliculaId/like', [verifyToken], likePelicula);

router.delete('/:userId/:peliculaId/unlike', [verifyToken], unlikePelicula);

router.post("/", [verifyToken, isAdmin],createPelicula);

router.post("/:userId/:peliculaId", [verifyToken, isAdmin], reproducirPelicula);

router.put("/:peliculaId", [verifyToken, isAdmin], updatePeliculaById);

router.delete("/:peliculaId", [verifyToken, isAdmin], deletePeliculaById);

export default router;