import { prismClient } from "@repo/db/client";
import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 3003 });

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", async (msg) => {
    try {
      const user = await prismClient.user.create({
        data: {
          username: Math.random().toString(),
          password: Math.random().toString(),
        },
      });

      // Send back the same message
      ws.send(msg.toString());

      // ws.send(JSON.stringify(user));
    } catch (err) {
      ws.send("Error creating user");
    }
  });
});

// Bun.serve({
//   port: 3003,
//   fetch(req, server) {
//     if (server.upgrade(req)) {
//       return;
//     }
//     return new Response("upgrade failed", { status: 500 });
//   },
//   websocket: {
//     message(ws, msg) {
//       prismClient.user.create({
//         data: {
//           username: Math.random().toString(),
//           password: Math.random().toString(),
//         },
//       });
//       ws.send(this.message);
//     },
//   },
// });
