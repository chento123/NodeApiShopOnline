const product = (app) => {
    const router = require("express").Router();
    const upload = require("../controller/upload.controller")
    const validateToken = require("../auth/validateToken.controller");
    const { SaveProduct, GetProduct, GetAutoID, TotalRecord, UpdateProduct, SearchProductByID, SearchProductByName } = require("../controller/product.controller")
    router.post("/product", validateToken, upload.single("image"), SaveProduct);
    router.get("/product", validateToken, GetProduct);
    router.put("/product", validateToken, upload.single("image"), UpdateProduct);
    router.get("/product-get-auto-id", validateToken, GetAutoID);
    router.get("/product-total", validateToken, TotalRecord);
    router.get("/product-search-name", validateToken, SearchProductByName);
    router.get("/product-search-id", validateToken, SearchProductByID)
    app.use(router)
}
module.exports = product