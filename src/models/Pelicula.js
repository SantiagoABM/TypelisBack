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
        default: () => new Date().getFullYear()
    },
    imgURL: {
        type: String,
        required: true
    },
    videoURL: {
        type: String,
        required: true
    },
    likes: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    comentarios: []
}, {
    timestamps: true,
    versionKey: false
})

export default model('Pelicula', peliculaSchema);