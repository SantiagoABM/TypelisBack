import Actor from '../models/Actor';

module.exports ={
    createActor: async(req, res) =>{
        const {name, descripcion, age, ciudad, peliculas} = req.body
        
        const newActor = new Actor({name, descripcion, age, ciudad, peliculas});

        const actorsaved = await newActor.save();

        res.status(201).json(actorsaved)
    },
    getActores: async(req, res)=>{
        const actores = await Actor.find();
        res.json(actores);
    },
    getActorById: async(req, res)=>{
        const actor = await Actor.findById(req.params.actorId);
        res.status(200).json(actor);
    },
    updateActorById: async(req, res)=>{
        const updateActor = await Actor.findByIdAndUpdate(req.params.actorId, req.body, {new: true});
        res.status(200).json(updateActor);

    },
    deleteActorById: async(req, res)=>{
        const {actorId} = req.params;
        await Actor.findByIdAndDelete(actorId);
        res.status(204).json();
    }

}