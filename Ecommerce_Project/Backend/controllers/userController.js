import userModel from "../models/userModel.js"
import { comparePassword, hashPassword } from "../bcryptpassword/password.js"
import JWT from "jsonwebtoken"

export const registerController = async (req,res) => {
  try {
    const {name, email, password} = req.body
    
    if(!name){
        return res.send({message : "Name is Required"})
    }

    if(!email){
        return res.send({message : "Email is Required"})
    }

    if(!password){
        return res.send({message : "Password is Required"})
    }

    const existingUser = await userModel.findOne({ email })

    if(existingUser){
        return res.status(200).send({
            success : false,
            message : "User Already Register Please Login"
        })
    }

    //register user
    const hashedPassword = await hashPassword(password)

    const user = await new userModel({name, email, password : hashedPassword}).save()

    res.status(201).send({
        success: true,
        message : "User Register Successfully",
        user,
    })


  } catch (error) {
    console.log(error)
    res.status(500).send({
        success : false,
        message : "Error in Registration",
        error : error
    })
  }
};

//POST
export const loginController = async (req,res) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
         return res.status(404).send({
            success : false,
            message : "Invalid Email or Password"
         })
        }
        const user = await userModel.findOne({ email })
        if(!user){
            return res.status(404).send({
              success : false,
              message : "Email is not Registered"
            })
        }
        const match = await comparePassword(password, user.password)
        if(!match){
            res.status(200).send({
               success : false,
               message : "Invalid Password"
            })
        }
        // token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn : "30d"})
        res.status(200).send({
            success : true,
            message : "Login Successfully",
            user: {
                name : user.name,
                email : user.email, 
                role  : user.role,            
            },
            token,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in Login",
            error
        })
    }
}

//test
export const testController = (req,res) => {
    try {
        res.send("Protected Routes")
    } catch (error) {
        console.log(error)
        res.send({error})
    }
}


// profile update
export const updateProfileController = async (req,res) => {
    try {
        const {name, email, password} = req.body
        const user = await userModel.findById(req.user._id)
        if(password && password.length < 6 ){
            return res.json({error: "Password is required and 6 character Long"})
        }
        const hashedPassword = password ? await hashPassword(password) : undefined

        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name : name || user.name,
            password :  hashedPassword || user.password,

        }, {new: true})
        res.status(200).send({
            success: true,
            message : "Profile Updated Successfully",
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error while updating Profile",
            error
        })
    }
}

