import { Router } from "express";
import {
  getPeliculas,
  createPelicula,
  updatePeliculaById,
  deletePeliculaById,
  getPeliculaById,
  likePelicula,
  unlikePelicula,
  reproducirPelicula,
  obtenerPeliculasConMasLikes,
  obtenerPeliculasFavoritas
} from "../controllers/peliculas.controller.js";
import { verifyToken, isModerator, isAdmin, isPremium } from "../middlewares/authJwt.js";
import multer from "multer";
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'), // guarda la imagen en la carpeta uploads
  filename: (req, file, cb, filename) => {
      cb(null, uuidv4() + path.extname(file.originalname));// se establece el nombre del archivo con uuid y su extensión del archivo
  }
  
}) // guarda imágenes en una ruta con su nombre generado

const upload = multer({ storage })

const router = Router();

router.get("/peliculalikes", obtenerPeliculasConMasLikes);

router.get("/", getPeliculas);

router.get("/:peliculaId", getPeliculaById);

router.get("/:userId/misfavoritos", [verifyToken], obtenerPeliculasFavoritas);

router.post('/:userId/:peliculaId/like', [verifyToken], likePelicula);

router.delete('/:userId/:peliculaId/unlike', [verifyToken], unlikePelicula);

router.post("/",  [verifyToken, isAdmin],createPelicula);

router.post("/:userId/:peliculaId", [verifyToken, isAdmin], reproducirPelicula);

router.put("/:peliculaId", [verifyToken, isAdmin], updatePeliculaById);

router.delete("/:peliculaId", [verifyToken, isAdmin], deletePeliculaById);

export default router;