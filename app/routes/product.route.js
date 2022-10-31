const product = (app) => {
    const router = require("express").Router();
    const validateToken = require("../auth/validateToken.controller");
    const { SaveProduct, GetProduct, CountProduct, GetAutoID, TotalRecord, UpdateProduct } = require("../controller/product.controller")
    router.post("/produc", validateToken, upload.single("image"), SaveProduct);
    router.get("/product", validateToken, GetProduct);
    router.put("/product", validateToken, upload.single("image"), UpdateProduct);
    router.get("/product-get-count", validateToken, CountProduct);
    router.get("/product-get-auto-id", validateToken, GetAutoID);
    router.get("/product-total", validateToken, TotalRecord)
    app.use(router)
}
module.exports = product