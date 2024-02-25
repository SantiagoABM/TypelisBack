import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3400;

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/typelis";

export const HOST = "http://localhost:3400/api";

export const SECRET = 'peliculas-api';

export const ROLES  = ["admin", "moderator", "premium", "user"]

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@gmail.com";

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

export const  SUCCESS_URL = "/";

export const  CANCEL_URL = "/";