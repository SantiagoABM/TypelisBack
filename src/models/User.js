import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }],
    favoritos: [{
        ref: "Pelicula",
        type: Schema.Types.ObjectId
    }],
    verluego: [{
        ref: "Pelicula",
        type: Schema.Types.ObjectId
    }],
    vistos: [{
        type: Schema.Types.ObjectId,
        ref: 'Pelicula'
    }]

}, {
    timestamps: true,
    versionKey: false
});

// Encripta una contraseña utilizando bcrypt
userSchema.statics.encryptPassword = async (password) => {
    // Genera un salt aleatorio con 10 rondas de salado
    const salt = await bcrypt.genSalt(10);
    // Genera el hash de la contraseña utilizando el salt generado
    return await bcrypt.hash(password, salt);
};

// Compara una contraseña en texto plano con una contraseña encriptada
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    // Compara las contraseñas y devuelve un booleano que indica si coinciden o no
    return await bcrypt.compare(password, receivedPassword);
};

// Hook que se ejecuta antes de guardar un documento de usuario
userSchema.pre("save", async function (next) {
    // Obtén una referencia al documento de usuario actual
    const user = this;
    // Verifica si el campo de contraseña ha sido modificado
    if (!user.isModified("password")) {
        // Si no ha sido modificado, continúa con el siguiente middleware/hook
        return next();
    }
    // Genera el hash de la contraseña actualizada
    const hash = await bcrypt.hash(user.password, 10);
    // Actualiza la contraseña en el documento de usuario con el hash generado
    user.password = hash;
    // Continúa con el siguiente middleware/hook
    next();
});

export default model('User', userSchema);