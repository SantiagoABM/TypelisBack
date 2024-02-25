import Role from "../models/Role.js";
import Genero from "../models/Genero.js";
import User from "../models/User.js";
import { ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD, ROLES } from "../config";
export const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
      new Role({ name: "premium" }).save(),
      new Role({ name: "user"}).save(),
    ]);

    console.log(values);
    createAdmin(); 

  } catch (error) {
    console.error(error);
  }
};

export const createGeneros = async () => {
    try {
      // Count Documents
      const count = await Genero.estimatedDocumentCount();
  
      // check for existing roles
      if (count > 0) return;
  
      // Create default Roles
      const values = await Promise.all([
        new Genero({ name: "Terror" }).save(),
        new Genero({ name: "Acción" }).save(),
        new Genero({ name: "Drama" }).save(),
        new Genero({ name: "Comedia" }).save(),
        new Genero({ name: "Romántica" }).save(),
        new Genero({ name: "Ficción" }).save(),
        new Genero({ name: "Aventura" }).save(),
        new Genero({ name: "Suspenso" }).save(),
        new Genero({ name: "Fantasía" }).save(),
        new Genero({ name: "Infantil" }).save(),
        new Genero({ name: "Misterio" }).save(),
        new Genero({ name: "Musical" }).save(),
        new Genero({ name: "Histórico" }).save(),
        new Genero({ name: "Animación" }).save()
      ]);
  
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  };

export const createAdmin = async () => {
  // check for an existing admin user
  const userFound = await User.findOne({ email: ADMIN_EMAIL });
  console.log(userFound);
  if (userFound) return;

  // get roles _id
  const roles = await Role.find({ name: { $in: ROLES } });
  
  const rolesIds = roles.map(role => role._id);
  console.log(rolesIds);
  // create a new admin user
  const newUser = await User.create({
    username: ADMIN_USERNAME,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    roles: rolesIds,
  });
  console.log(`new user created: ${newUser.email}`);
};

createGeneros();
createRoles();