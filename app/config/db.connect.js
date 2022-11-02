var mysql = require("mysql");
var db = mysql.createConnection({
    host: "bcetx4gghn9r5n1y63zn-mysql.services.clever-cloud.com",
    user: "urznniiiv8h2jobl",
    password: "K5upGI4gOv9EUIZnG73n",
    database: "bcetx4gghn9r5n1y63zn",
});
db.connect();
module.exports = db;