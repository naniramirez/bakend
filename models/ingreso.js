
import mongoose from 'mongoose'

const IngresoSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Login', required: true,
    },
    proveedor:
        { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true, },

    tipoComprobante:{
        type:String,
       
       

    },

    numComprobante:{
        type:String,
      

    },
    serieComprobante:{  
        type:String,
      
       

    },
    impuesto:{
        type:Number,
     
        
    },
    total:{
        type:Number,
        

    },
    
    
    estado: {
        type: Number,
        default: 1
    },
    fecha:{
        type: Date,
        default: Date.now

    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    detalles:[{
        id:{
             type:String,
             required:true
         },
         nombre:{
             type:String,
            
           
         },
         cantidad:{
             type:Number, 
          
         },
         precio:{
             type:Number
 
         },
         subtotal:{
             type:Number,
           
         },
 
     }],


})


   
   


export default mongoose.model("Ingreso", IngresoSchema)