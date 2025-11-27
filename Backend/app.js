import express from "express";
import authRoutes from './http/routers/auth.route.js'
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';
const app = express();
const PORT = 4444;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
   origin: 'http://localhost:5173'
}))

const httpServer = createServer(app);
const io = new Server(httpServer, {
   cors: {
      origin: "http://localhost:5173"
   }
});


// Routes - For handling HTTP request
app.use('/api/auth', authRoutes);


// Socket.io setup for making real time changes
io.on("connection", (socket)=>{
   console.log('Client Connected: ', socket.id);

   socket.on("sendMessage", (data) => {
      io.emit("receiveMessage", data);
   });

   socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
   });
})

httpServer.listen(PORT, ()=>{
   console.log(`http://localhost:${PORT}`)
})

// I do have some doubts in Socket.io 