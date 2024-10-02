import express from "express";
import { SERVER_PORT } from "../global/environment";
// import socketIO from "socket.io"; -> lower versions
import { Server as SocketIOServer } from "socket.io"; // from ^3.00
import http from "http";

import * as socket from "../sockets/socket";

export default class Server {
  private static _instance: Server; // **Singleton Pattern
  public app: express.Application;
  public port: number;
  public io: SocketIOServer;
  public httpServer: http.Server;

  constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = http.createServer(this.app);
    this.io = new SocketIOServer(this.httpServer, {
      /**
       * Solution global
       */
      // cors: {
      //   origin: true,
      //   credentials: true,
      // },
      cors: {
        /**
         * ya se esta indicando quien si tiene permisos de conectarse al socket:
         */
        origin: "http://localhost:4200",
      },
    });
    this.listenToSockets();
  }

  // **Singleton Pattern
  public static get instance() {
    return this._instance || (this._instance = new Server());
  }

  start(callback: VoidFunction) {
    this.httpServer.listen(this.port, callback);
  }

  private listenToSockets() {
    console.log("Listening to Socket conections");

    this.io.on("connection", (client) => {
      console.log("Client ON");

      // Mensaje
      socket.userMessage(client, this.io);

      // Desconectar
      socket.disconnectUser(client);
    });
  }
}
