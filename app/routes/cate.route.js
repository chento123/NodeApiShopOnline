const category = (app) => {
    const router = require("express").Router();
    const validateToken = require("../auth/validateToken.controller");
    const upload = require("../controller/upload.controller")
    const {
        GetCate,
        SaveCate,
        TotalRecord,
        GetAutoID,
        UpdateCate,
        CountCate
    } = require("../controller/cate.controller");
    router.get("/category", validateToken, GetCate);
    router.post("/category", validateToken, upload.single("image"), SaveCate);
    router.get("/category-total", validateToken, TotalRecord);
    router.get("/category-autoID", validateToken, GetAutoID);
    router.put("/category-updatecate", validateToken, upload.single("image"), UpdateCate);
    router.get("/get-count-cate", validateToken, CountCate);
    app.use(router);
};
module.exports = category;