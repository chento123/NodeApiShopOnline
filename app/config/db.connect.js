var mysql = require("mysql");
var db = mysql.createConnection({
    host: "b7liytagts1pagus0vyk-mysql.services.clever-cloud.com",
    user: "u5b7wdovoxpvnw9m",
    password: "ia7uAyrIm0laju5SkrEy",
    database: "b7liytagts1pagus0vyk",
});
db.connect();
module.exports = db;