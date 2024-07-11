import { entorno } from "../config/config.js";
// esto es un selector de dependencias
let services;

switch (entorno.persistence) {
    case "MONGO":
        services = await import(
            "./mongo/services.mongo.js"
        )
        break;
    case "MEMORY":

        break;
    case "MYSQL":
        break;
    case "FS":
        break;
    default:
        break;
}


export default services