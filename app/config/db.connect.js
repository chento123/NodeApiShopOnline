var mysql = require("mysql");
var db = mysql.createConnection({
    host: "bs6yrnw4qi2chbktjh76-mysql.services.clever-cloud.com",
    user: "uwhb8avxg6alt0e3",
    password: "bs6yrnw4qi2chbktjh76",
    database: "bs6yrnw4qi2chbktjh76",
});
db.connect();
module.exports = db;