const SubCate = (app) => {
    const router = require("express").Router()
    const validateToken = require("../auth/validateToken.controller")
    const { AutoGetSubCateID, CountSubCate, GetSubCate, SaveSubCate, UpdateSubCate, } = require("../controller/subcate.controller")
    router.post("/sub-cate", validateToken, upload.single("image"), SaveSubCate)
    router.get("/sub-cate-auto-id", validateToken, AutoGetSubCateID)
    router.get("/get-count-sub-cate", validateToken, CountSubCate)
    router.get("/get-sub-cate", validateToken, GetSubCate)
    router.put("/update-sub-cate", validateToken, upload.single("image"), UpdateSubCate)
    app.use(router)
}
module.exports = SubCate