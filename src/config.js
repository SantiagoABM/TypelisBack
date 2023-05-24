import { config } from "dotenv";
config();

export default{
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/typelis",
    PORT: process.env.PORT || 3333,
    SECRET: 'peliculas-api',

    ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@gmail.com",
    ADMIN_USERNAME: process.env.ADMIN_USERNAME || "admin",
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "admin"
}