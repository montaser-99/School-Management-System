import express from "express"
const materialRouter=express.Router()
import auth from "../middlewares/auth.js"
import authorizedRoles from "../middlewares/authorizedRoles.js"
import {AddMaterial,GetMaterialBySubject,DeleteMaterial }from "../controllers/materialController.js"


materialRouter.post("/add",auth,authorizedRoles("Admin,Teacher"),AddMaterial)
materialRouter.delete("/:id",auth,authorizedRoles("Admin,Teacher"),DeleteMaterial)
materialRouter.get("/:id",auth,GetMaterialBySubject)


export default materialRouter