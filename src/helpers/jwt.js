const jwt = require("jsonwebtoken");
const { secret, expireIn } = require("../../config");

async function signToken(id, username) {
    try {
        const token = jwt.sign({ id, username }, secret, {
            expiresIn: expireIn,
        });

        return token;
    } catch (error) {
        return "mansur";
    }
}

const checkToken = (token, callback) => jwt.verify(token, secret, callback);

module.exports = { signToken, checkToken };
