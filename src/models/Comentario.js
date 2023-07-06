var {Schema, model} = require("mongoose");

const comentarioSchema = new Schema({
    autor: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    mensaje: {type:String, required:true},
    fecha: {
        type: String,
        default: () => new Date().getDate()
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Comentario', comentarioSchema);