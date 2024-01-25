import User from '../models/User';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import Role from '../models/Role';


export const signupHandler = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;
    // Creating a new User Object
    const newUser = new User({
      username,
      email,
      password
    });


    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }
    // Saving the User Object in Mongodb
    const savedUser = await newUser.save();
    console.log(savedUser)
    const roleNames = savedUser.roles.map(role => role.name); 

    const tokenPayload = {
      id: savedUser._id,
      name: savedUser.username,
      role: roleNames 
    };
    console.log(tokenPayload || 'No hay token');
    // Create a token
    const token = jwt.sign(tokenPayload, SECRET, {
      expiresIn: 43200, 
    });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({error, message: ''});
  }
};
export const signinHandler = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email }).populate("roles");

  if (!userFound) return res.status(400).json({ message: "User not found" })

  const matchPassword = await User.comparePassword(req.body.password, userFound.password);

  if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid password' });

  const roleNames = userFound.roles.map(role => role.name);

  const tokenPayload = {
    id: userFound._id,
    name: userFound.username,
    role: roleNames 
  };

  const token = jwt.sign(tokenPayload, SECRET, {
    expiresIn: 86400
  })

  res.json({ token })

}
export const updatePassword = async (req, res) => {
  const { userId, newPassword } = req.body;

  try {
    // Buscar el usuario por su ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Generar el hash de la nueva contraseña
    const newPasswordHash = await User.encryptPassword(newPassword);

    // Actualizar la contraseña del usuario
    user.password = newPasswordHash;
    await user.save();

    return res.status(200).json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar la contraseña" });
  }
};