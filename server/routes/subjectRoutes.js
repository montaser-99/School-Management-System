import express from "express"
const subjectRouter=express.Router()
import auth from "../middlewares/auth.js"
import authorizedRoles from "../middlewares/authorizedRoles.js"
import {AddSubject,GetAllSubjects,GetSubjectById }from "../controllers/subjectController.js"


userRouter.post("/add",auth,authorizedRoles("Admin"),AddSubject)
userRouter.get("/all",auth,authorizedRoles("Admin"),GetAllSubjects)
userRouter.get("/:id",auth,GetSubjectById)


export default subjectRouter