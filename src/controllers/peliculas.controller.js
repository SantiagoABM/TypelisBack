import multer from 'multer';
import Pelicula from '../models/Pelicula';
import User from '../models/User';



module.exports = {
    createPelicula: async (req, res) => {

        console.log(req.file)

        const pelicula = new Pelicula();
        pelicula.name = req.body.name;
        pelicula.descripcion = req.body.descripcion;
        pelicula.director = req.body.director;
        pelicula.year = req.body.year;
        pelicula.genero = req.body.genero;
        pelicula.imgURL = req.file.path;
        pelicula.actores = req.body.actores;
        pelicula.videoURL = req.body.videoURL;
        pelicula.vistas = req.body.vistas;
        pelicula.likes = req.body.likes;

        console.log(pelicula)
        try {
            const peliculaSaved = await pelicula.save();
            res.status(201).json(peliculaSaved);
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Error al guardar la película' });
        }
    },

    getPeliculas: async (req, res) => {
        try {
            const peliculas = await Pelicula.find();

            if (peliculas.length === 0) {
                return res.status(404).json({ mensaje: 'No se encontraron películas' });
            }

            res.status(200).json(peliculas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al obtener las películas' });
        }
    },

    getPeliculaById: async (req, res) => {
        try {
            const pelicula = await Pelicula.findById(req.params.peliculaId);

            if (!pelicula) {
                return res.status(404).json({ mensaje: 'Pelicula no encontrada' });
            }

            res.status(200).json(pelicula);
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al obtener la pelicula' });
        }
    },
    updatePeliculaById: async (req, res) => {
        try {
            const updatePelicula = await Pelicula.findByIdAndUpdate(
                req.params.peliculaId,
                req.body,
                { new: true }
            );

            res.status(200).json(updatePelicula);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la película' });
        }
    },
    deletePeliculaById: async (req, res) => {
        const { peliculaId } = req.params;
        await Pelicula.findByIdAndDelete(peliculaId);
        res.status(204).json();
    },
    obtenerPeliculasConMasLikes: async (req, res) => {
        try {
            const peliculas = await Pelicula.find()
                .sort({ likes: -1 })
                .limit(10)
                .exec();

            res.json(peliculas);
        } catch (error) {
            console.error('Error al obtener las películas:', error);
            res.status(500).json({ error: 'Error al obtener las películas' });
        }
    },
    reproducirPelicula: async (req, res) => {
        const peliculaId = req.params.peliculaId;
        const usuarioId = req.params.usuarioId;

        try {
            // Incrementar el contador de vistas de la película
            await Pelicula.findByIdAndUpdate(peliculaId, { $inc: { vistas: 1 } });

            // Agregar el ID de la película al array de vistos del usuario
            await User.findByIdAndUpdate(usuarioId, { $addToSet: { vistos: peliculaId } });

            res.status(200).json({ message: 'Película reproducida correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al reproducir la película' });
        }
    },
    likePelicula: async (req, res) => {
        const peliculaId = req.params.peliculaId;
        const userId = req.params.userId;
        try {

            // Buscar la película por su ID
            const peli = await Pelicula.findById(peliculaId);
            const userPeliculaLike = await User.findById(userId);

            // Verificar si la película existe
            if (!peli) {
                return res.status(404).json({ message: 'Película no encontrada' });
            }
            // Verificar si el usuario ya ha dado like a la película
            if (userPeliculaLike.favoritos.includes(peliculaId)) {
                return res.status(400).json({ message: 'Ya has dado like a esta película' });
            }

            // Incrementar el contador de likes de la película
            await Pelicula.findByIdAndUpdate(peliculaId, { $inc: { likes: 1 } });

            // Actualizar el documento de usuario marcando la película como favorita
            await User.findByIdAndUpdate(userId, { $addToSet: { favoritos: peliculaId } });

            res.status(200).json({ message: 'Like agregado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al dar like a la película' });
        }
    },

    obtenerPeliculasFavoritas: async (req, res) => {
        const userId = req.params.userId; // ID del usuario proporcionado en la ruta
      
        try {
          // Buscar el usuario por su ID
          const usuario = await User.findById(userId);
      
          if (!usuario) {
            res.status(404).json({ mensaje: 'Usuario no encontrado' });
          }
      
          // Obtener los IDs de las películas favoritas del usuario
          const peliculasFavoritasIds = usuario.favoritos;
      
          // Buscar las películas favoritas por los IDs
          const peliculasFavoritas = await Pelicula.find({
            _id: { $in: peliculasFavoritasIds }
          });
      
          res.status(200).json(peliculasFavoritas.reverse());
        } catch (error) {
          console.error('Error al obtener las películas favoritas:', error);
          res.status(500).json({ error: 'Error al obtener las películas favoritas' });
        }
      },

    unlikePelicula: async (req, res) => {

        const peliculaId = req.params.peliculaId;
        const userId = req.params.userId;
        try {

            // Buscar la película por su ID
            const peli = await Pelicula.findById(peliculaId);
            const userPeliculaLike = await User.findById(userId);

            // Verificar si la película existe
            if (!peli) {
                return res.status(404).json({ message: 'Película no encontrada' });
            }
            // Verificar si el usuario ya ha dado like a la película
            if (userPeliculaLike.favoritos.includes(peli)) {
                return res.status(400).json({ message: 'No le has dado like a esta película' });
            }

            // Incrementar el contador de likes de la película
            await Pelicula.findByIdAndUpdate(peliculaId, { $inc: { likes: -1 } });

            // Actualizar el documento de usuario marcando la película como favorita
            await User.findByIdAndUpdate(userId, { $pull: { favoritos: peliculaId } });

            res.status(200).json({ message: 'Dislike agregado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al quitar like a la película' });
        }
    },


}
