// Import
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Export the constants
export default {
    NAME: "My App",
    LOGO_PATH: "/img/logo.jpg",
    LOGO_MIMETYPE: "image/jpeg",
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY
};