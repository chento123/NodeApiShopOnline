const slide = (app) => {
    const router = require("express").Router();
    const upload = require("../controller/upload.controller")
    const validateToken = require("../auth/validateToken.controller")
    const { SaveSlide, GetSlide, TotalRecord, GetAutoID, UpdateSlide, SearchSlideByID, SearchSlideByName } = require("../controller/slide.controller")
    router.post("/slide", validateToken, upload.single("image"), SaveSlide);
    router.get("/slide", validateToken, GetSlide);
    router.get("/slide-total", validateToken, TotalRecord);
    router.get("/slide-auto-id", validateToken, GetAutoID);
    router.put("/slide", validateToken, upload.single("image"), UpdateSlide)
    router.get("/slide-search-id", validateToken, SearchSlideByID);
    router.get("/slide-search-name", validateToken, SearchSlideByName)
    app.use(router)
}
module.exports = slide;