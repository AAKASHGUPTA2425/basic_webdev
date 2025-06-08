import mongoose from "mongoose";


const subSchema=new Schema({
    subscriber:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    channel:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
},{timestamp:true})
export const Subscription =mongoose.model('Subscription',subSchema)