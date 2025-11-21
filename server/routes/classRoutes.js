import express from "express"
const classRouter = express.Router()
import auth from "../middlewares/auth.js"
import authorizedRoles from "../middlewares/authorizedRoles.js"
import { AddClass, GetClass, GetAllClasses } from "../controllers/classController.js"


userRouter.post("/add", auth, authorizedRoles("Admin"), AddClass)
userRouter.get("/all", auth, authorizedRoles("Admin"), GetAllClasses)
userRouter.get("/:id", auth, GetClass)


export default classRouter