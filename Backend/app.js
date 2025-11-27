import express from "express";
import authRoutes from "./http/routers/auth.route.js";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
const PORT = 4444;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// Routes - For handling HTTP request
app.use("/api/auth", authRoutes);

let stocksEmittinData = new Map();

function subscribeToStock(stockName) {
  if (!stocksEmittinData.get(stockName)) {
    let id = setInterval(() => {
      io.to(stockName).emit(`${stockName}-price`, {
        price: Math.floor(300 + Math.random() * 100),
      });
    }, 1000);

    stocksEmittinData.set(stockName, id);
  }
}

io.on("connection", (socket) => {
  console.log(socket.id);
  let currentStock = null;

  socket.on("hello", ({ message }) => {
    console.log("HELLO EVENT AAYA", message);
    socket.emit("HEY", { message: "Hello CLIENT" });
  });

  socket.on("subscribe-tata", () => {
    if (currentStock) {
      // currentStock = hyundai
      socket.leave(currentStock);
    }

    socket.join("tata");
    currentStock = "tata";
    subscribeToStock(currentStock);
  });

  socket.on("subscribe-maruti", () => {
    if (currentStock) {
      // currentStock = hyundai
      socket.leave(currentStock);
    }

    socket.join("maruti");
    currentStock = "maruti";
    subscribeToStock(currentStock);
  });

  socket.on("subscribe-hyundai", () => {
    if (currentStock) {
      // currentStock = tata
      socket.leave(currentStock);
    }
    // DB SE HYUNDAI KE PAST PRICES BHI SEND HONGE EK BAARI
    socket.join("hyundai");
    currentStock = "hyundai";
    subscribeToStock(currentStock);
  });

  socket.on("disconnect", () => {
    console.log("REMOVING", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
