import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

const mailer = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: process.env.MAILER,
        pass: process.env.PASSWORD
    }
})

export default mailer