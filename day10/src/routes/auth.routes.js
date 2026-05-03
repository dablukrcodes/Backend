const express = require("express")
const authRouter = express.Router()
const UserModel = require("../models/user.model")
const jwt = require("jsonwebtoken") 


authRouter.post("/register", async(req, res) => {
    const {name, email, password} = req.body
  
    const isUserExist = await UserModel.findOne({email})

    if(isUserExist) {
        return res.status(400).json({
            message: "Email already exists"
        })
    }





  const user = await UserModel.create({ 
        name, email, password
        })

        const token = jwt.sign(
            {Id: user._id ,
                 email: user.email
                }
                , process.env.JWT_SECRET,
                   {expiresIn: "1h"}
                )
     
 res.cookie("token", token)
   

    res.status(201).json({
        message: "User registered successfully",
        user,
        token
    })

    })

   
    

     

    module.exports = authRouter
