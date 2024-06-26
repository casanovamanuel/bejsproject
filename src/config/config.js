import dotenv from "dotenv";

dotenv.config();

export const entorno = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    secretJWT: process.env.SECRET_JWT,
    mongooseSessionSecret: process.env.MONGOOSE_SESSION_SECRET,
    persistence: process.env.PERSISTENCE
};
