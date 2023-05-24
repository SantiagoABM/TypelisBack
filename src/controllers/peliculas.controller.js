import Pelicula from '../models/Pelicula';
import User from '../models/User';

module.exports = {
    createPelicula: async (req, res) => {
        const { name, descripcion, actores, genero, year, imgURL, videoURL } = req.body

        const newPelicula = new Pelicula({ name, descripcion, actores, genero, year, imgURL, videoURL });

        const peliculaSaved = await newPelicula.save();

        res.status(201).json(peliculaSaved)
    },
    getPeliculas: async (req, res) => {
        const peliculas = await Pelicula.find();
        res.json(peliculas);
    },
    getPeliculaById: async (req, res) => {
        const pelicula = await Pelicula.findById(req.params.peliculaId);
        res.status(200).json(pelicula);
    },
    updatePeliculaById: async (req, res) => {
        const updatePelicula = await Pelicula.findByIdAndUpdate(req.params.peliculaId, req.body, { new: true });
        res.status(200).json(updatePelicula);

    },
    deletePeliculaById: async (req, res) => {
        const { peliculaId } = req.params;
        await Pelicula.findByIdAndDelete(peliculaId);
        res.status(204).json();
    },
    likePelicula: async (req, res) => {
        try {
            const peliculaId = req.params.peliculaId;
            const userId = req.params.userId;

            // Buscar la película por su ID
            const pelicula = await Pelicula.findById(peliculaId);

            // Verificar si la película existe
            if (!pelicula) {
                return res.status(404).json({ message: 'Película no encontrada' });
            }

            // Verificar si el usuario ya ha dado like a la película
            if (pelicula.likes.includes(userId)) {
                return res.status(400).json({ message: 'Ya has dado like a esta película' });
            }

            // Agregar el ID del usuario a los likes de la película
            pelicula.likes.push(userId);

            // Guardar los cambios en la película
            await pelicula.save();

            // Actualizar el documento de usuario marcando la película como favorita
            await User.findByIdAndUpdate(userId, { $addToSet: { favoritas: peliculaId } });

            res.status(200).json({ message: 'Like agregado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al dar like a la película' });
        }
    },

    unlikePelicula: async (req, res) => {
        try {
            const peliculaId = req.params.peliculaId;
            const userId = req.params.userId;

            // Buscar la película por su ID
            const pelicula = await Pelicula.findById(peliculaId);

            // Verificar si la película existe
            if (!pelicula) {
                return res.status(404).json({ message: 'Película no encontrada' });
            }

            // Verificar si el usuario ha dado like a la película
            if (!pelicula.likes.includes(userId)) {
                return res.status(400).json({ message: 'No has dado like a esta película' });
            }

            // Quitar el ID del usuario de los likes de la película
            pelicula.likes.pull(userId);

            // Guardar los cambios en la película
            await pelicula.save();

            // Actualizar el documento de usuario eliminando la película de las favoritas
            await User.findByIdAndUpdate(userId, { $pull: { favoritas: peliculaId } });

            res.status(200).json({ message: 'Like removido exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al remover el like de la película' });
        }
    }
}