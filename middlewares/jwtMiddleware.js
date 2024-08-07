const jwt = require("jsonwebtoken")

exports.jwtMiddleware=(req,res,next)=>{
    console.log("___JWT middleware___")
    try{
        //access token from req
        const token = req.headers["access_token"].split(" ")[1]
        console.log(token);
        //verify
        const jwtRes = jwt.verify(token,process.env.SECRET_KEY)
        //access the payload and store
        req.payload = jwtRes.userId
        //exit from middleware function and continue
        console.log(req.payload);
        next()
    }catch{
        res.status(401).json("Authentication failed. Please login")
    }
}