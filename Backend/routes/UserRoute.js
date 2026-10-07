import express from 'express'
import { createRecord, deleteRecord, forgetPassword1, forgetPassword2, forgetPassword3, getRecord, getSingleRecord, login, updateRecord } from '../controller/UserController.js'
const UserRouter= express.Router()

UserRouter.post("/sign-up",createRecord)
// UserRouter.post("/google-auth",googleLogin)
UserRouter.get("",getRecord)
UserRouter.get("/profile/:_id",getSingleRecord)
UserRouter.put("/update/:_id",updateRecord)
UserRouter.delete("/:_id",deleteRecord)
UserRouter.post("/login",login)
UserRouter.post("/forgetpassword1",forgetPassword1)
UserRouter.post("/forgetpassword2",forgetPassword2)
UserRouter.post("/forgetpassword3",forgetPassword3)


export default UserRouter