const db = require("../config/db.connect");
const { local_token, isEmpty } = require("../config/help.js");
const { SaveData, CheckDuplicate } = require("../action/database.action");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const LoginUser = (req, res) => {
    var { username, password } = req.body;
    var message = {};
    if (isEmpty(username)) {
        message.username = "username require";
    } else if (isEmpty(password)) {
        message.password = "password requre";
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message,
        });
    } else {
        var sql = `SELECT *FROM tbl_user WHERE username=?`;
        db.query(sql, [username], (err, result, fld) => {
            if (!err) {
                if (result.length == 0) {
                    res.json({
                        error: true,
                        message: "username does not exit",
                    });
                } else {
                    var datapassword = result[0].password;
                    if (bcrypt.compareSync(password, datapassword)) {
                        delete result[0].password
                        const accessToken = generateToken({ user: result });
                        res.json({
                            error: false,
                            message: "Login Sucess",
                            access_token: accessToken,
                            data: result
                        })
                    } else {
                        res.json({
                            error: true,
                            message: "password does not exit",

                        })
                    }
                }
            } else {
                res.json({
                    error: true,
                    message: err,
                });
            }
        });
    }
};

const RegisterUser = (req, res) => {
    var { id, fullname, username, password, data_createed, date_login } =
    req.body;
    var message = {};
    if (isEmpty(fullname)) {
        message.fullname = "fullname is require";
    } else if (isEmpty(username)) {
        message.username = "Username is require";
    } else if (isEmpty(data_createed)) {
        message.data_createed = "Date Created is require";
    } else if (isEmpty(date_login)) {
        message.date_login = "Date Login is require";
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message,
        });
    } else {
        // check douplicate username
        const tbl = "tbl_user";
        const cond = "username=?";
        const val1 = [username];
        CheckDuplicate(tbl, cond, val1, res)
        password = bcrypt.hashSync(password, 10);
        var val = [fullname, username, password, data_createed, date_login];
        var mark = "NULL,?";
        SaveData(tbl, val, mark, res);
    }
};
const generateToken = (obj_infor) => {
    return jwt.sign({ obj_infor }, local_token, { expiresIn: "7h" })
}

module.exports = { LoginUser, RegisterUser };