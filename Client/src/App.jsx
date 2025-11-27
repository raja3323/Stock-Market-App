import { useEffect } from "react";
import { io } from "socket.io-client";

function App() {

   useEffect(() => {
      const socket = io("http://localhost:4444");

      socket.on("connect", () => {
         console.log("Connected to socket:", socket.id);
      });

      return () => {
         socket.disconnect();
      };
   }, []);

   return (
      <>
         App
      </>
   )
}

export default App;
