import {Schema, model} from 'mongoose';

const generoSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    }, {
        versionKey: false
    }
);

export default model("Genero", generoSchema);
