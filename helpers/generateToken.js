import jwt from "jsonwebtoken"

const tokenSign = async (user)=>{
    return jwt.sign(
        {
            _id: user._id,
            rol: user.rol
        },
        process.env.SECRETORPRIVATEKEY,
        {
            expiresIn: "2h",
        }

    );
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.SECRETORPRIVATEKEY)
    } catch (e) {
        return null
    }
}

const decodeSign = (token) => { // Verificar que el token sea valido y correcto
    return jwt.decode(token, null)
}


export { tokenSign, decodeSign, verifyToken }