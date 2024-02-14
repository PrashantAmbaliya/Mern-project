const {verifyJWT} = require('./jwtAuth')


function softAuth (req,res,next){
    const {Token } = req.body;
    
    const payload = verifyJWT(Token)   
    if(payload){
        req.email = payload.email
    }
    next()
}


module.exports = softAuth