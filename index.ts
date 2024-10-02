import Server from "./classes/server";
import router from "./routes/router";
import bodyParser, { BodyParser } from "body-parser";
import cors from "cors";

// config
const server = Server.instance;

// BodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// CORS
server.app.use(cors({ origin: true, credentials: true }));

// Rutas de servicios
server.app.use("/", router);
server.start(() => {
  console.log(`Server running in Port: ${server.port}`);
});
