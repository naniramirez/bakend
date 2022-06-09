
import mongoose from 'mongoose'

const ClienteSchema = mongoose.Schema({
    nombre:{
        type:String,
        required: [true, "el usuario es obligatorio"],
        
    },
    
    tipoPersona:{
        type:String,
        required: [true, " el cliente es obligatorio"],
       
    },

    tipoDocumento:{
        type:String,
        required:[true, "El tipo de comprobante es obligatorio"],
       
    },

    numDocumento:{
        type:String,
        required:[true, "El numero de Documento es obligatorio 1"],
      

    },
    direccion:{
        type:String,
        required:[true, "la direccion es obligatorio"],
       
    },
    telefono:{
        type:Number,
        required:[true, "El impuesto es obligatorio"],
       
    },
    email:{
        type:String,
        required:[true, "el total es necesario"],
        

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


   
   


export default mongoose.model("Cliente", ClienteSchema) 