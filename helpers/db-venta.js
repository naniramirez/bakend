import Venta from "../models/venta.js"
import Articulo from "../models/articulo.js"

const helperVenta ={
    existeVentaById: async (id) =>{
        const existe = await Venta.findById(id)
        
        if(!existe){  
            throw new Error(`El id no existe ${id}`)
        }
    },
    existeVentaByUsuario: async (usuario) =>{
        const existe = await Venta.findOne({usuario})
        if(existe){
            throw new Error(`ya existe venta con el usuario: ${usuario}`)
        }
    },

   
    

}

const existeArticuloStock= async (detalles)=>{
    if(detalles){
        for(let i = 0; i < detalles.length; i++){
            const detalle = detalles[i]
            const articulo = await Articulo.findById(detalle.id)
            if(articulo){
                if((articulo.stock - detalle.cantidad)<0){
                    throw new Error(`Stock insuficiente del articulo: ${articulo.nombre}`)
                }
            }else{
                throw new Error(`Stock insuficiente del articulo: ${articulo.nombre}`)
            }
        }
    }
}
 const detallesVacios =async (detalles) => {
 
    for (let i = 0; i < detalles.length; i++) {
         const detalle = detalles[i]
   
            if (detalle.nombre==="" || detalle.cantidad==="" || detalle.precio==="" || detalle.descuento===""){
                 throw new Error('Agrega un articulo')
             }
         
     }
}





export {helperVenta,existeArticuloStock, detallesVacios } 