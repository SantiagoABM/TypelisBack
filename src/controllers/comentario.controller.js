import Pelicula from '../models/Pelicula';

module.exports ={
    createComentario: async(req, res) =>{
        let comentario = {
            user: req.body.user,
            descripcion: req.body.descripcion,
            fecha: () => new Date().getDate()
        };
        const newComentario = new Pelicula.findOneAndUpdate({_id:req.params.id},{$push:{"comentarios": comentario }},{returnOriginal:false});

        const comentarioSaved = await newComentario.save();

        res.status(201).json(comentarioSaved)
    },
    getComentarios: async(req, res)=>{
        const comentarios = await Pelicula.find({}, { comentarios: 1, _id: 0 })
        res.json(comentarios);
    },
    updateComentarioById: async(req, res)=>{
        const updateComentario = await Pelicula.findByIdAndUpdate({ _id:req.params.peliculaId, "comentarios.user": req.params.userId }, { $set: { "comentarios.$.descripcion": req.body.descripcion } }, {new:true});
        res.status(200).json(updateComentario);
    },
    deleteComentarioById: async(req, res)=>{
        const {comentarioId} = req.params;
        await Pelicula.findByIdAndDelete(comentarioId);
        res.status(204).json();
    }

}