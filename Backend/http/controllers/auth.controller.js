import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config()
import { signupValidation, loginValidation } from "../validation/auth.validation.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

let prisma = new PrismaClient();


export async function Signup(req, res){
   const {email, name, password} = req.body;
   let existing = await prisma.user.findUnique({
      where: {email}
   })
   if(existing){
      res.status(401).json({
         message: "User Already Exist."
      })
   }
   try {
      const result = signupValidation.safeParse(req.body);
      if(!result.success){
         return res.status(401).json({
            error: JSON.parse(result.error)
         })
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      let user = await prisma.user.create({
         data: {
            name,
            email,
            password: passwordHash
         }
      })
      console.log(user)

      
      res.status(200).json({
         user
      })
   
   } catch (error) {
      return error;
   }
}

export async function login(req, res) {
   const result = loginValidation.safeParse(req.body);
   if(!result.success){
      return res.status(401).json({
         error: JSON.parse(result.error)
     })
   }
   const {email, password} = req.body;

   let user = await prisma.user.findUnique({
      where: {email}
   })

   if(!user){
      return res.status(400).json({
         error: "Email does not exist."
      })
   }

   let ok = await bcrypt.compare(password, user.password);
   if(!ok){
      res.status(401).json({
         error: "Password is invalid."
      })
   }

   let token = jwt.sign({name: user.name, email, user: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'});
   res.status(200).json({
      message: "Logged in successfully",
      user,
      token
   })
}

export async function getMe(req, res){
   return res.status(200).json({
      user: req.user
   })
}