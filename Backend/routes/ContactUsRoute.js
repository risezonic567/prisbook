import express from 'express'
import { createRecord } from '../controller/ContactUsController.js'
const ContactUsRouter= express.Router()

ContactUsRouter.post("/send",createRecord)

export default ContactUsRouter