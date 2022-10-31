const user = (app) => {
    const router = require("express").Router();
    const { LoginUser, RegisterUser } = require("../auth/User");
    router.get("/login", LoginUser);
    router.post("/register", RegisterUser);
    app.use(router);
};
module.exports = user;