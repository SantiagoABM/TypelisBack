import {Schema, model} from 'mongoose';

const actorSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        ciudad: {
            type: String,
            required: true
        },
        lenguaje: {
            type: String,
            required: true
        }, 
        imgURL:{
            type: String,
            required: true
        },
        peliculas: [{
            ref: "Pelicula",
            type: Schema.Types.ObjectId
        }]

    }, {
        timestamps: true,
        versionKey: false
    }
);

export default model("Actor", actorSchema);
