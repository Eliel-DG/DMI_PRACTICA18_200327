import { exit } from "process";
import express from "express";
import {dbConnection1} from "./config/db.js";
import { router } from "./routes/playerRoute.js";
import {Player, Game} from "./models/relationships.js";
import players from "./seed/players.js";
import games from "./seed/games.js";

const importarDatos = async () => {
    try{
        await db.authenticate()

        await db.sync()

        await Promise.all([
            Player.bulkCreate(players),
            games.bulkCreate(games),
        ])

        console.log('Datos importados correctamente')
        exit()
    } catch (error){
        console.log(error)
        exit(1)
    }
}

const api = new express();
const port = 20032;

// Utiliza express.json() para analizar el cuerpo de la solicitud en formato JSON
api.use(express.json());

api.use("/players", router);

try {
    console.log("Status -> Intentando Conectar a la Base de Datos ....");
    dbConnection1.authenticate();
    console.log("Status -> Conexión a la Base de Datos es exitosa....");
    console.log("Status -> Sincronizando la base de Datos con los objectos existentes");
    dbConnection1.sync();
    console.log("Status -> La base de Datos está lista para realizar operaciones");
} catch (error) {
    console.error("Han ocurrido errores al intentar conectar a la base de datos");
    console.error(error);
}

api.listen(port, () => {
    console.log(`El API ha sido iniciado y se encuentra por el puerto: ${port}`);
});
