const projects = require("../Model/projectmodel")

//adding new project
exports.addProject=async(req,res)=>{
    const {title, description, technologies, website, gitHub} = req.body
    //image is in req.file (multer)
    const coverImg = req.file?.filename

    //accessing userId ( userId is assign in jwtmiddleware )
    const userId = req.payload

    //check Project  already exist 
    try{
        const existingProject = await projects.findOne({gitHub})
        if(existingProject){
            res.status(406).json(`${existingProject.title} is already exist. Try adding new one!`)
        }else{
                const newProject = new projects({
                title, description, technologies, website, gitHub, userId, coverImg
            })
            newProject.save()
            res.status(201).json(newProject)
        }
    }catch{
        res.status(400).json("Add Api failed!")
    }
}

exports.getHomeProject=async(req,res)=>{
    try{
        const homeProjects=await projects.find().limit(3)
        if(homeProjects){
            res.status(200).json(homeProjects)
        }
    }catch{
        res.status(400).json("Get home project Api failed!")
    }
}

exports.getAllProject=async(req,res)=>{
    const searchData=req.query.search
    try{
        const homeProjects=await projects.find({title:{$regex:searchData,$options:"i"}}) //i=case insentive
        if(homeProjects){
            res.status(200).json(homeProjects)
        }
    }catch{
        res.status(400).json("Get home project Api failed!")
    }
}

exports.getUserProjects=async(req,res)=>{
    const userId=req.payload
    try{
        const userProjects=await projects.find({userId})
        if(userProjects){
            res.status(200).json(userProjects)
        }
    }catch(err){
        res.status(400).json(err)
    }
}

exports.updateProject=async(req,res)=>{
    const userId=req.payload
    const {_id}=req.params
    const {title, description, technologies, website, gitHub, coverImg} = req.body
    const newCoverImg = req.file? req.file.filename : coverImg
    try{
        const updatedProject = await projects.findByIdAndUpdate({_id},
            { title, description, technologies, coverImg : newCoverImg, website, gitHub, userId },
            {new:true}
        )
        await updatedProject.save()
        res.status(200).json(updatedProject)
    }catch(er){
        res.status(400).json(er)
    }
}

exports.deleteProject = async (req, res) => {
    try{
        const { _id } = req.params;
        const deletedProject = await projects.findByIdAndDelete({ _id });
        res.status(200).json(deletedProject);
    }catch(er){
        res.status(400).json(er)
    }
};