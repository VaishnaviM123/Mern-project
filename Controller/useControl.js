const users=require('../Model/usermodel')
const jwt = require("jsonwebtoken")

//register logic
exports.register=async(req,res)=>{

    // res.json("sucess");

    // fetch data from request

    // var username=req.body.username
    // console.log(username);
    // var email=req.body.email
    // var password=req.body.password

    var {username,email,password}=req.body

    //store an object if email exist else null
    try{
       const existingUser = await users.findOne({email})

        //if existing user is an object
        if(existingUser){
            res.status(401).json("Already registered! Please login.")
        }
        //if existing user is null
        else{
            //object creation
            const newUser = new users({
                username,email,password,linkedIn:"",gitHub:"",profile:""
            })
            //save the object in mongodb
            await newUser.save()
            res.status(201).json("Account created Successfully!")
        }
    }catch{
        res.status(400).json("Register api failed!")
    }
}


//Login logic
exports.login=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await users.findOne({email,password})
        if(user){
            //token creation
            const token=jwt.sign({userId:user._id},process.env.SECRET_KEY)
            res.status(202).json({
                user,
                message:"Login Success",
                token
            })
        }else{
            res.status(401).json("Incorrect Credentials, try again!")
        }
    }catch{
        res.status(400).json("Login api failed")
    }
}

//update profile
exports.updateProfile=async(req,res)=>{
    const {_id}=req.params
    const {username, linkedIn, gitHub, profile} = req.body
    const newProfile = req.file? req.file.filename : profile
    try{
        const user = await users.findOne({_id})
        console.log(user);
        if(user){
            user.username=username
            user.linkedIn=linkedIn
            user.gitHub=gitHub
            user.profile=newProfile
             
            await user.save()
            res.status(200).json(user)
        }
    }catch(er){
        res.status(400).json(er)
    }
}