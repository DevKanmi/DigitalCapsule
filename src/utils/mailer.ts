import { config } from "dotenv";
import nodemailer from 'nodemailer'

config()

const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD



const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user : EMAIL_USER,
        pass: EMAIL_PASSWORD
    },
    debug: true,
    logger: true
})

export const sendMail = async(email: string, title: string, content: string) =>{
const mailOptions = {
    from : EMAIL_USER,
    to: email,
    subject: title,
    html: content
}

await transport.sendMail(mailOptions)

}