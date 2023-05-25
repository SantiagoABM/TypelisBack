const express = require('express');
const morgan = require('morgan');
const pkg = require('../package.json');
import helmet from "helmet";
import './database';
//rutas
import peliculaRoutes from "./routes/pelicula.routes.js";
import usersRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import './libs/initialSetup';
const app = express();
//settings
app.set('pkg', pkg);
app.set("json spaces", 4);

//middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extend: false }));
//rutas
app.use("/api/peliculas", peliculaRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

export default app;