
import Cliente from "../models/cliente.js"

const helperCliente = {
    
    existeClienteById: async (id,req) => {
        const existe = await Cliente.findById(id)

        if (!existe) {
            throw new Error(`El id: ${id} no existe `)
        }
        req.req.cliente=existe

    },
     existeClienteByEmail: async (email, req) => {
        const existe = await Cliente.findOne({email})

        //VALIDAR QUE CUANDO SEA EDITANDO PERMITA CAMBIAR EL EMAIL
        if (req.req.method==="POST"){
        if (existe) {
            throw new Error(`Ya existe Cliente con el email:  ${email}`)
        } 
    }else if(req.req.method==="PUT"){
        if (existe) {
            if(req.req.cliente.email != existe.email){
                throw new Error(`Ya existe Cliente con el email:  ${email}`)
            }
        }
    }
    
     },


    existeClienteBynumeroDocumento: async (numDocumento,req) => {
        const existe = await Cliente.findOne({numDocumento})

        if (req.req.method==="POST"){
            if (existe) {
                throw new Error(`Ya existe Cliente con el numero de documento:  ${numDocumento}`)
            }
        }else if (req.req.method==="PUT"){
            if (existe) {
            if(req.req.cliente.numDocumento != existe.numDocumento){
                throw new Error(`Ya existe Cliente con el numero de documento:  ${numDocumento}`)
            }
        }
    }

        
    }, 

}


export default helperCliente