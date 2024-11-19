import { Schema, model, Document } from "mongoose";

import { User } from "./users.model";
interface capsule extends Document {
    user: User,
    title: string,
    content: string,
    media: string[],
    unlockDate: Date,
    isUnlocked: Boolean,
    email: string
    
}

const capsuleSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    media: {
        type: [String],
        default: []
    },

    unlockDate: {
        type: Date,
        required: true
    },

    isUnlocked: {
        type: Boolean,
        default: false
    }
})

capsuleSchema.set('toJSON',{
    transform(document, returnedObject) {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

export const Capsule = model<capsule>('Capsule', capsuleSchema)