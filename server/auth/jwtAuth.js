const jwt = require('jsonwebtoken');

const secrateKey = "process.env.SECRET_KEY";

function createJWT({email}) {
    const token = jwt.sign({ email: email }, secrateKey);
    return token;
}

function verifyJWT(token) {
    try {
        const payload = jwt.verify(token, secrateKey);
        return payload;
    } catch (error) {
        return error;
    }
}

module.exports = { verifyJWT, createJWT };
