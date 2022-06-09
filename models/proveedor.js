
import mongoose from 'mongoose'

const ProveedorSchema = mongoose.Schema({
    nombre:{
        type:String,
        

    },
    
    tipoPersona:{
        type:String,
       
    },

    tipoDocumento:{
        type:String,
       

    },

    numDocumento:{
        type:String,
        maxlength:15,

    },
    direccion:{
        type:String,
        

    },
    telefono:{
        type:Number,
        maxlength:15,
    },
    email:{
        type:String,
        

    },
    
    estado: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})


   
   


export default mongoose.model("Proveedor", ProveedorSchema)