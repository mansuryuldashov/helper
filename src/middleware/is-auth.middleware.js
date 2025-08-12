const { checkToken } = require("../helpers/jwt");

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    
    if (!token) {
        return res.status(401).json({ message: "Register please" });
    }

    checkToken(token, (err, data) => {
        if (err) {
            return res.status(401).json({ message: "Register please" });
        }

        req.user = data;

        next();
    })
};