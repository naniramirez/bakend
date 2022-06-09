
import Proveedor from "../models/proveedor.js"

const helperProveedor = {
    existeProveedorById: async (id, req) => {
        const existe = await Proveedor.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
        req.req.proveedor = existe
    },
    existeProveedorByemail: async (email, req) => {
        const existe = await Proveedor.findOne({ email })
        if (req.req.method === "POST") {
            if (existe) {
                throw new Error(`Ya existe proveedor con el email:  ${email}`)
            }
        } else if (req.req.method === "PUT") {
            if (existe) {
                if (req.req.proveedor.email != existe.email) {
                    throw new Error(`Ya existe proveedor con el email:  ${email}`)
                }
            }
        }


    },



    existeProveedorBynumeroDocumento: async (numDocumento, req) => {
        console.log(numDocumento);
        const existe = await Proveedor.findOne({ numDocumento })
        if (req.req.method === "POST") {
            if (existe) {
                throw new Error(`Ya existe proveedor con el numero de documento:  ${numDocumento}`)
            }
        } else if (req.req.method === "PUT") {
            if (existe) {
                if (req.req.proveedor.numDocumento != existe.numDocumento) {
                    throw new Error(`Ya existe proveedor con el numero de documento:  ${numDocumento}`)
                }
            }

        }


    },


}


export default helperProveedor