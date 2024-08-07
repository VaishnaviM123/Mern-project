const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    technologies:{
        type:String,
        required:true
    },
    coverImg:{
        type:String,
        required:true
    },
    website:{
        type:String,
        required:true,
        unique:true
    },
    gitHub:{
        type:String,
        required:true,
        unique:true
    },
    userId:{
        type:String,
        required:true
   }
})

const projects = mongoose.model("projects",projectSchema)

module.exports = projects