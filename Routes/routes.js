const express = require("express")
const { register, login, updateProfile } = require("../Controller/useControl")
const upload = require("../middlewares/multerMiddleware")
const { addProject, getHomeProject, getAllProject, getUserProjects, updateProject, deleteProject } = require("../Controller/ProjectControlers")
const { jwtMiddleware } = require("../middlewares/jwtMiddleware")

//creating router
const router = new express.Router()

//register
router.post('/user/register',register)

//login
router.post('/user/login',login)

//add project
router.post('/user/add-project',jwtMiddleware,upload.single('coverImg'),addProject)

//get 3 project for home page
router.get('/home-projects',getHomeProject)

//get all project for home page
router.get('/all-projects',getAllProject)

//user projects
router.get('/user-projects',jwtMiddleware,getUserProjects)

//edit project
router.put('/user/:_id/edit-project',jwtMiddleware,upload.single('coverImg'),updateProject)

//delete project
router.delete('/user/delete-project/:_id',jwtMiddleware,deleteProject)

//edit profile
router.put('/user/:_id/edit-profile',jwtMiddleware,upload.single('profile'),updateProfile)

module.exports = router