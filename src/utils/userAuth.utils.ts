import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { config } from 'dotenv'
import logger from './logger'
import crypto from 'crypto'
import { sendMail } from './mailer'

config()

const JWT_SECRET : any = process.env.JWT
const jwt_lifetime = process.env.lifetime

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);


export const hashPassword = async(password: string): Promise<String> =>{
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

export const verifyPassword = async(pass1: string, pass2: string) =>{
    return await bcrypt.compare(pass1, pass2)

}


export const createtoken = (id: string) =>{
    const token = jwt.sign({id: id}, JWT_SECRET, {expiresIn: jwt_lifetime})
    return token
}

export const validToken = (token: string) : JwtPayload =>{
    return jwt.verify(token, JWT_SECRET) as JwtPayload
}

export const encryptContent = (content: string) =>{
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(content, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    return encrypted

    
}

export const decryptContent  = (content: string) =>{
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = decipher.update(content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted
}


export const sendACapsule = async(username: string, email: string, title: string, content: string) =>{
    try{
    
        const subject =  title
        const body = `<p>Dear ${username}, </p> </br>


        <p><b>${content}</b></p> </br>


        <p> We are always rooting for you!🥰</p> </br>

        <p>With Love, From Us at Digital Capsule ❤</p> </br>
        
        
        <p> You are getting this Message because you wanted to recieve a capsule, if this was not created by you, Kindly ignore <p>`


        await sendMail(email, subject, body)

    }
catch(error){
    console.log(error)
}
}
