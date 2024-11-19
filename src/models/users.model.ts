import { Schema, Document,model } from "mongoose";

export interface User extends Document {
    email: string,
    username: string, 
    password: string,
    capsules: string
}

const userSchema =new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please add a valid email",
        ],
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Password needs to have at least one lower case, one uppercase, one number, one special character (ONLY !, @, #, $, %, ^, &, or * are allowed), and must be at least 8 characters",
        ],
    },

    capsules : [{
        type: Schema.Types.ObjectId,
        ref: 'Capsule'
    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.password,
        delete returnedObject.__v
    }
})

export const User = model<User>('User', userSchema)