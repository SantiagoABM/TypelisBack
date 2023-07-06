import Actor from '../models/Actor';

module.exports ={
    createActor: async (req, res) => {
        try {
          const { name, descripcion, age, ciudad, imgURL, lenguaje } = req.body;
      
          // Validar que los campos requeridos estén presentes
      
          const newActor = new Actor({ name, descripcion, age, ciudad, imgURL, lenguaje });
      
          const actorSaved = await newActor.save();
      
          res.status(201).json(actorSaved);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Ocurrió un error en el servidor' });
        }
      },
      
      getActores: async (req, res) => {
        try {
          const actores = await Actor.find();
          res.json(actores);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Ocurrió un error en el servidor' });
        }
      },
      
      getActorById: async (req, res) => {
        try {
          const actor = await Actor.findById(req.params.actorId);
          if (!actor) {
            return res.status(404).json({ error: 'Actor no encontrado' });
          }
          res.status(200).json(actor);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Ocurrió un error en el servidor' });
        }
      },
      
      updateActorById: async (req, res) => {
        try {
            const updateActor = await Actor.findByIdAndUpdate(
                req.params.peliculaId,
                req.body,
                { new: true }
            );

            res.status(200).json(updateActor);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar al actor' });
        }
      },
      
      deleteActorById: async (req, res) => {
        try {
          const { actorId } = req.params;
          const actor = await Actor.findByIdAndDelete(actorId);
          if (!actor) {
            return res.status(404).json({ error: 'Actor no encontrado' });
          }
          res.status(204).json();
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Ocurrió un error en el servidor' });
        }
      }
      

}