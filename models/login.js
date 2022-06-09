import mongoose from 'mongoose'

const LoginSchema=mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        maxlength:120,
        required:true
    },
    rol:{
        type:String,
        required:true,
       
    },
    estado:{
        type:Number,
        default:1
    },
    createAt:{
        type:Date,
        default: Date.now
    }
})

export default mongoose.model('Login', LoginSchema)