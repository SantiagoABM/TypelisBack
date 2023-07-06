import Genero from "../models/Genero";
import Pelicula from "../models/Pelicula";

module.exports = {
  createGenero: async (req, res) => {
    const { name } = req.body;

    const newGenero = new Genero({ name });

    const generoSaved = await newGenero.save();

    res.status(201).json(generoSaved)
  },
  getGeneros: async (req, res) => {
    try {
      const generos = await Genero.find();
      res.json(generos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la lista de generos' });
    }
  },
  getGeneroById: async (req, res) => {
    const genero = await Genero.findById(req.params.generoId);
    res.status(200).json(genero);
  },
  updateGeneroById: async (req, res) => {
    const updateGenero = await Genero.findByIdAndUpdate(req.params.generoId, req.body, { new: true });
    res.status(200).json(updateGenero);
  },
  deleteGeneroById: async (req, res) => {
    const { generoId } = req.params;
    await Genero.findByIdAndDelete(generoId);
    res.status(204).json();
  }

}