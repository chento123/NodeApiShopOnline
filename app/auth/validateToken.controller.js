const { local_token } = require("../config/help")
const jwt = require("jsonwebtoken")
const validateToken = (req, res, next) => {
    var AuthHeader = req.headers["authorization"]
    if (AuthHeader) {
        AuthHeader = AuthHeader.split(" ")
        var token = AuthHeader[1]
        jwt.verify(token, local_token, (err, obj_infor) => {
            if (!err) {
                // req.user mean you have key user in object
                req.user = obj_infor;
                next();
            } else {
                res.json({
                    error: true,
                    message: "Invalid Token"
                })
            }
        })
    } else {
        res.json({
            error: true,
            message: "Access Token require"
        })
    }

}
module.exports = validateToken