const slide = (app) => {
    const router = require("express").Router();
    const upload = require("../controller/upload.controller")
    const validateToken = require("../auth/validateToken.controller")
    const { SaveSlide, GetSlide, TotalRecord, GetAutoID, UpdateSlide, CountSlide } = require("../controller/slide.controller")
    router.post("/slide", validateToken, upload.single("image"), SaveSlide);
    router.get("/slide", validateToken, GetSlide);
    router.get("/slide-tota", validateToken, TotalRecord);
    router.get("/slide-auto-id", validateToken, GetAutoID);
    router.put("/slide", validateToken, upload.single("image"), UpdateSlide)
    router.get("/count-slide", validateToken, CountSlide)
    app.use(router)
}
module.exports = slide;