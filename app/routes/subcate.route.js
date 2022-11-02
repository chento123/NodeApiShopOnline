const SubCate = (app) => {
    const router = require("express").Router()
    const validateToken = require("../auth/validateToken.controller");
    const upload = require("../controller/upload.controller")
    const { AutoGetSubCateID, TotalRecord, GetSubCate, SaveSubCate, UpdateSubCate, SearchCateByID, SearchCateByName } = require("../controller/subcate.controller")
    router.post("/sub-cate", validateToken, upload.single("image"), SaveSubCate)
    router.get("/sub-cate-auto-id", validateToken, AutoGetSubCateID)
    router.get("/get-count-sub-cate", validateToken, TotalRecord)
    router.get("/sub-cate", validateToken, GetSubCate)
    router.put("/sub-cate", validateToken, upload.single("image"), UpdateSubCate);
    router.get("/sub-cate-search-name", validateToken, SearchCateByName);
    router.get("/sub-cate-search-id", validateToken, SearchCateByID)
    app.use(router)
}
module.exports = SubCate