const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const jwt = require("jsonwebtoken");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("");
});
//http://localhost:3000/photo/1667139652747-a1.png
require("./app/routes/cate.route")(app);
require("./app/routes/user.route")(app);
require("./app/routes/slide.route")(app)
require("./app/routes/subcate.route")(app)
require("./app/routes/product.route")(app)
app.use("/photo", express.static('upload'));
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log("Server port : localhost" + port);
});