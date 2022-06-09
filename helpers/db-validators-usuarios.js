import Login from "../models/login.js"

const permisoRegister={

}

const helperUsuario = {
    existeUsuarioById: async (id, req) => {
        const existe = await Login.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
        req.usuario = existe
    },
   
    existeUsuarioByemail: async (email, req) => {
        const existe = await Login.findOne({email})

        if (req.req.method === "POST") {
            if (existe) {
                throw new Error(`Ya existe usuario con el email:  ${email}`)
            }
        } else if (req.req.method === "PUT") {
            if (existe) {
                if (req.req.login.email != existe.email) {
                    throw new Error(`Ya existe usuario con el email:  ${email}`)
                }
            }
        }
    },


}


export default helperUsuario