import express from "express"
const userRouter=express.Router()
import auth from "../middlewares/auth.js"
import authorizedRoles from "../middlewares/authorizedRoles.js"
import {AddStudent,AddTeacher,Login, Logout }from "../controllers/userController.js"


userRouter.post("/add-student",auth,authorizedRoles("Admin"),AddStudent)
userRouter.post("/add-teacher",auth,authorizedRoles("Admin"),AddTeacher)
userRouter.post("/add-teacher",auth,Login)
userRouter.post("/add-teacher",auth,Logout)

export default userRouter