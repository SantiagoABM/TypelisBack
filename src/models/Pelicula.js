import {Schema, model} from 'mongoose';

const peliculaSchema = new Schema({
    name: {
        type: String,
        
    },
    director: {
        type: String,   
        
    },
    actores: [{
        ref: "Actor",
        type: Schema.Types.ObjectId
    }],
    genero: [{
        ref: "Genero",
        type: Schema.Types.ObjectId,
    }],
    descripcion: {
        type: String,
        
    },
    year: {
        type: Number,
        default: 0
    },
    imgURL: {
        type: String
    },
    videoURL: {
        type: String,
        
    },
    likes: {
        type: Number,
        default: 0
    },
    comentarios: [],
    vistas: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true,
    versionKey: false
})

export default model('Pelicula', peliculaSchema);