import  { verifyToken } from "../helpers/generateToken.js"

const checkAuth = async (req, res, next) => {
    try {
        //TODO: authorization: Bearer 1010101010101001010100 
        const token = req.headers.authorization.split(' ').pop() //TODO:123123213
        const tokenData = await verifyToken(token)
        if (tokenData._id) {
            next()
        } else {
            res.status(409)
            res.send({ error: 'usted no esta autorizado!' })
        }

    } catch (error) {
        console.log(error)
        res.status(409)
        res.send({ error: 'usted no esta autorizado!' })
    }

}

export {checkAuth}