const db = require("./db.connect");
const isEmpty = (value) => {
    if ((value == "" || value == null) || value == undefined) {
        return true;
    }
    return false;
};
const local_token = "fijewfewgbfukebcdwkfkewufegw";

module.exports = {
    isEmpty,
    local_token,
};