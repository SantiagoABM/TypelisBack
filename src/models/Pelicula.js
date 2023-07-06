import {Schema, model} from 'mongoose';

const peliculaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    director: {
        type: String,   
        require: true
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
        required: true,
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
        required: true
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