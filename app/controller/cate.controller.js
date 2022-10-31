const db = require("../config/db.connect");
const { isEmpty, local_token } = require("../config/help");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
    GetList,
    SaveData,
    CountData,
    AutoGetID,
    UpdateList,
} = require("../action/database.action");
const GetCate = (req, res) => {
    var { s, e } = req.body;
    const fld = "*";
    const tbl = "tbl_category";
    var cond = "id>0";
    var od = "id";
    if (s == undefined) {
        res.json({
            error: true,
            message: "Start Require to limit data",
        });
    } else if (isEmpty(e)) {
        res.json({
            error: true,
            message: "End Require to limit data",
        });
    } else {
        GetList(fld, tbl, s, e, cond, od, res);
    }
};
const SaveCate = (req, res) => {
    const { id, name, od, name_link, status } = req.body;

    var message = {};
    var image = req.file.filename;

    if (isEmpty(name)) {
        message.name = "name is require";
    } else if (isEmpty(od)) {
        message.od = "order by is require";
    } else if (isEmpty(name_link)) {
        message.name_link = "Name Link is require";
    } else if (isEmpty(status)) {
        message.status = "status is require";
    } else if (isEmpty(image)) {
        message.image = "image is require"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message,
        });
    } else {
        var sql = `SELECT COUNT(*) AS Count FROM tbl_category WHERE name=?`;
        db.query(sql, [name], (err, result, fld) => {
            if (err) {
                res.json({
                    error: true,
                    message: err
                })
            } else {
                if (result[0].Count > 0) {
                    res.json({
                        error: true,
                        message: "Duplicate name !!",
                    })
                } else {
                    const tbl = "tbl_category";
                    var val = [name, image, od, name_link, status];
                    const mark = "NULL,?"
                    SaveData(tbl, val, mark, res);
                }
            }
        })
    }
};
const TotalRecord = (req, res) => {
    //tbl, cond, val, res
    var { id } = req.body;
    const tbl = "tbl_category";
    var cond = "id>?";
    val = 0;
    CountData(tbl, cond, val, res);
};
const GetAutoID = (req, res) => {
    //(tbl, fld, od, res
    const tbl = "tbl_category";
    var fld = "id";
    var od = "id DESC";
    AutoGetID(tbl, fld, od, res);
};
const UpdateCate = (req, res) => {
    const { name, od, name_link, status, id } = req.body;
    var message = {};
    var image = req.file.filename;
    if (isEmpty(name)) {
        message.name = "name is require";
    } else if (isEmpty(image)) {
        message.image = "photo is require";
    } else if (isEmpty(od)) {
        message.od = "order by is require";
    } else if (isEmpty(name_link)) {
        message.name_link = "Name Link is require";
    } else if (isEmpty(status)) {
        message.status = "status is require";
    } else if (isEmpty(id)) {
        message.CheckID = "reuqire CheckID to find value";
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message,
        });
    } else {
        var sql = `SELECT COUNT(*) AS Count FROM tbl_category WHERE name=? AND id !=?`;
        db.query(sql, [name, id], (err, result, fld) => {
            if (err) {
                res.json({
                    error: true,
                    message: err
                })
            } else {
                if (result[0].Count > 0) {
                    res.json({
                        error: true,
                        message: "Duplicate name !!",
                    })
                } else {
                    const tbl = "tbl_category";
                    var fld = `name=?,photo=?,od=?,name_link=?,status=?`;
                    var val = [name, image, od, name_link, status, id];
                    var cond1 = "id=?";
                    UpdateList(tbl, fld, cond1, val, res);
                }
            }
        })
    }
};
//tbl, cond, val, res
const CountCate = (req, res) => {
    const tbl = "tbl_category";
    const cond = "status=?";
    const val = 1;
    CountData(tbl, cond, val, res)
}
module.exports = {
    GetCate,
    SaveCate,
    TotalRecord,
    GetAutoID,
    UpdateCate,
    CountCate
};