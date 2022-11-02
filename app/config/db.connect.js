var mysql = require("mysql");
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_shop_01",
});
db.connect();
module.exports = db;