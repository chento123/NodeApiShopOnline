const user = (app) => {
    const router = require("express").Router();
    const { LoginUser, RegisterUser, GetUser, UpdateUser, SearchUserByName, SearchUserByID, GetAutoID, TotalRecord } = require("../controller/user.controller");
    const upload = require("../controller/upload.controller")
    const validateToken = require("../auth/validateToken.controller")
    router.get("/login", LoginUser);
    router.post("/register", upload.single("image"), RegisterUser);
    router.get("/user", validateToken, GetUser);
    router.post("/user", validateToken, RegisterUser);
    router.put("/user", validateToken, upload.single("image"), UpdateUser);
    router.get("/user-search-name", validateToken, SearchUserByName);
    router.get("/user-search-id", validateToken, SearchUserByID);
    router.get("/user-get-auto-id", validateToken, GetAutoID);
    router.get("/user-total-record", validateToken, TotalRecord);

    app.use(router);
};
module.exports = user;