import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
let prisma = new PrismaClient();

export async function requireAuth(req, res, next){
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.decode(token, process.env.JWT_SECRET);
       const user = await prisma.user.findUnique({
          where: {email: decoded.email}
       })
       if(!user){
          res.status(401).json({error: "Invalid or expired token."});
       }
   
       req.user = user;
       next();
     } catch (error) {
        console.log(error);
        return res.status(401).json({error: "Unauthorized"})
     }
}
