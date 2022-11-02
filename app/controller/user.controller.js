const db = require("../config/db.connect");
const { local_token, isEmpty } = require("../config/help.js");
const { SaveData, AutoGetID, CountData, GetList, Search, UpdateList } = require("../action/database.action");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const LoginUser = (req, res) => {
    var { username, password } = req.body;
    var message = {};
    var ts = Date.now();
    var date_ob = new Date(ts);
    var date = date_ob.getDate();
    var month = date_ob.getMonth() + 1;
    var year = date_ob.getFullYear();
    var hours = date_ob.getHours();
    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();
    var date_login = year + '-' + month + '-' + date + " " + hours + ":" + minutes + ":" + seconds;
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
        var sql = `SELECT id,fullname,photo,username,password,status FROM tbl_user WHERE username=?`;
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
                        delete result[0].username
                        const accessToken = generateToken({ user: result });
                        var sql1 = `UPDATE tbl_user SET date_login=? WHERE username=?`;
                        db.query(sql1, [date_login, username], (err, result, fld) => {
                            if (err) {
                                res.json({
                                    error: true,
                                    message: err
                                })
                                return false
                            }
                        })
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
    var { id, fullname, username, password, od, status } =
    req.body;
    var message = {};
    var ts = Date.now();
    var date_ob = new Date(ts);
    var date = date_ob.getDate();
    var month = date_ob.getMonth() + 1;
    var year = date_ob.getFullYear();
    var hours = date_ob.getHours();
    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();
    var date_login = year + '-' + month + '-' + date + " " + hours + ":" + minutes + ":" + seconds;
    var photo = "";
    if (!req.file) {
        message.photo = " No upload file";
    } else {
        photo = req.file.filename;
    }
    if (isEmpty(fullname)) {
        message.fullname = "fullname is require";
    } else if (isEmpty(username)) {
        message.username = "Username is require";
    } else if (isEmpty(password)) {
        message.password = "password is require"
    } else if (password.length < 5) {
        message.password = "password must have 6 digits"
    } else if (isEmpty(od)) {
        message.od = "od is require"
    } else if (isEmpty(status)) {
        message.status = "status is require"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message,
        });
    } else {
        // check douplicate username
        const tbl = "tbl_user";
        var sql = `SELECT COUNT(*) AS Count FROM tbl_user WHERE username=?`;
        db.query(sql, [username], (err, result, fld) => {
            if (err) {
                res.json({
                    error: true,
                    message: err
                })
            } else {
                if (result[0].Count > 0) {
                    res.json({
                        error: true,
                        message: "Duplicate username !!"
                    })
                } else {
                    password = bcrypt.hashSync(password, 10);
                    var val = [fullname, photo, username, password, date_login, date_login, od, status];
                    var mark = "NULL,?";
                    SaveData(tbl, val, mark, res);
                }
            }
        })
    }
};
const GetUser = (req, res) => {
    var { s, e } = req.body;
    const fld = "id,fullname,photo,username,data_createed,date_login,od,status";
    const tbl = "tbl_user";
    var cond = "id>0";
    var od = "id";
    var message = {}
    if (isEmpty(e)) {
        message.e = "end is require and have to greater than zero"
    } else if (isEmpty(s)) {
        s = 0
    } else if (s > e) {
        message.cannot = "start value can not greater than end value"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
    } else {
        GetList(fld, tbl, s, e, cond, od, res);
    }
};
const UpdateUser = (req, res) => {
    // var { id, fullname, username, od, status } = req.body;
    var { id, fullname, username, od, status } = req.body;
    var message = {};
    var photo = "";
    if (!req.file) {
        message.photo = "No upload file";
    } else {
        photo = req.file.filename;
    }
    if (isEmpty(fullname)) {
        message.fullname = "fullname is require";
    } else if (isEmpty(od)) {
        message.od = "order by is require";
    } else if (isEmpty(username)) {
        message.username = "username is require";
    } else if (isEmpty(status)) {
        message.status = "status is require";
    } else if (isEmpty(id)) {
        message.id = "id is require";
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message,
        });
    } else {
        var sql = `SELECT COUNT(*) AS Count FROM tbl_user WHERE username=? AND id !=?`;
        db.query(sql, [username, id], (err, result, fld) => {
            if (err) {
                res.json({
                    error: true,
                    message: err
                })
            } else {
                if (result[0].Count > 0) {
                    res.json({
                        error: true,
                        message: "Duplicate username !!",
                    })
                } else {
                    const tbl = "tbl_user";
                    var fld = `fullname=?,photo=?,username=?,od=?,status=?`;
                    var val = [fullname, photo, username, od, status, id];
                    var cond1 = "id=?";
                    UpdateList(tbl, fld, cond1, val, res);
                }
            }
        })
    }
};
//tbl, cond, val, res

const SearchUserByName = (req, res) => {
    var { name, s, e } = req.body;
    var message = {};
    if (isEmpty(e)) {
        message.e = "end is require and have to greater than zero"
    } else if (isEmpty(name)) {
        message.name = "name is require"
    } else if (isEmpty(s)) {
        s = 0
    } else if (s > e) {
        message.cannot = "start value can not greater than end value"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
    } else {
        const tbl = "tbl_user";
        const fld = "id,fullname,photo,username,data_createed,date_login,od,status";
        const cond = `fullname LIKE '%${name}%' OR username LIKE '%${name}%' `;
        const od = "id DESC"
        Search(fld, tbl, cond, od, s, e, res);
    }
}
const SearchUserByID = (req, res) => {
    var { id, s, e } = req.body;
    var message = {};
    if (isEmpty(e)) {
        message.e = "end is require and have to greater than zero"
    } else if (isEmpty(id)) {
        message.id = "id is require"
    } else if (isEmpty(s)) {
        s = 0
    } else if (s > e) {
        message.cannot = "start value can not greater than end value"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
    } else {
        const tbl = "tbl_user";
        const fld = "id,fullname,photo,username,data_createed,date_login,od,status";
        const cond = `id LIKE '%${id}%'`;
        const od = "id DESC"
        Search(fld, tbl, cond, od, s, e, res);
    }
}
const generateToken = (obj_infor) => {
    return jwt.sign({ obj_infor }, local_token, { expiresIn: "7h" })
}
const TotalRecord = (req, res) => {
    //tbl, cond, val, res
    const tbl = "tbl_user";
    var cond = "id>0";
    CountData(tbl, cond, res);
};
const GetAutoID = (req, res) => {
    //(tbl, fld, od, res
    const tbl = "tbl_user";
    var fld = "id";
    var od = "id DESC";
    AutoGetID(tbl, fld, od, res);
};
module.exports = {
    LoginUser,
    RegisterUser,
    GetUser,
    UpdateUser,
    GetAutoID,
    TotalRecord,
    SearchUserByName,
    SearchUserByID,
};