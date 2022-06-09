
import mongoose from 'mongoose'

const VentaSchema = mongoose.Schema({
    usuario:{
        type:mongoose.Schema.Types.ObjectId, ref: 'Login',
        required:true,
        
    },
    
    cliente:{ 
        type:mongoose.Schema.Types.ObjectId, ref: 'Cliente', 
        required: [true, "el cliente es obligatorio"],
    },
    
    tipoComprobante:{
        type:String,
        
    }, 

    numComprobante:{
        type:Number, 
       

    }, 
    serieComprobante:{
        type:Number,
       
 
    },
    impuesto:{
        type:Number, 
       
      
    },
    total:{
        type:Number,
        
      

    },
    fecha:{
        type:Date,
        default:Date.now,
      
    },
    estado: {
        type: Number,
        default: 1
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
        descuento:{ 
            type:Number,
            
            
        

        }

    }],
    
   
})


   
   


export default mongoose.model("Venta", VentaSchema) 