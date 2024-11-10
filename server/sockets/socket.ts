import { Socket } from "socket.io";
import { Server as SocketIOServer } from "socket.io";

export const disconnectUser = (user: Socket) => {
  user.on("disconnect", () => {
    console.log("Client OFF");
  });
};

// Listen to messages
export const userMessage = (user: Socket, io: SocketIOServer) => {
  user.on("message", (payload: { from: string; content: string }) => {
    console.log("Message recieved: ", payload);

    io.emit("message-new", payload);
  });
};
