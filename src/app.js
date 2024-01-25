const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path')
//const multer = require('multer');
//const { v4: uuidv4} = require('uuid');
const pkg = require('../package.json');
import helmet from "helmet";
import './database';
//rutas
import peliculaRoutes from "./routes/pelicula.routes.js";
import usersRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
//import paymentRoutes from "./routes/payment.routes.js";
import generoRoutes from "./routes/genero.routes";
import actorRoutes from "./routes/actor.routes";
import './libs/initialSetup';
const app = express();

//settings
app.set('pkg', pkg);
app.set("json spaces", 4);// establece el número de espaio usados para formatear la salida JSON generada por la app


//middlewares
app.use(express.static(path.join(__dirname, 'public')));// está siendo usado para servir archivos estáticos que están en la carpeta public
app.use(express.json());
app.use(helmet()); // ayuda a progeter la aplicación de vulnerabilidades y ataques comunes a la web
app.use(morgan('dev'));// permite mostrar las solicitudes http en la consola
app.use(cors());// permite que los recursos de la api sean accedidos desde algún dominio diferente
app.use(express.urlencoded({ extend: false }));// analiza los datos codificados en la URL
//const storage = multer.diskStorage({
//    destination: path.join(__dirname, 'uploads'), // guarda la imagen en la carpeta uploads
//    filename: (req, file, cb, filename) =>  {
//        cb(null, uuidv4() + path.extname(file.originalname));// se establece el nombre del archivo con uuid y su extensión del archivo    
//    }
//}) // guarda imágenes en una ruta con su nombre generado
//app.use(multer({storage}).single('imgURL'));


//rutas
app.use("/api/peliculas", peliculaRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/generos", generoRoutes);
app.use("/api/actores", actorRoutes); 
//app.use("/api/payments", paymentRoutes);



export default app;