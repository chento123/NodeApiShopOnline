const db = require("../config/db.connect");
const { SaveData, GetList, CountData, AutoGetID, UpdateList } = require("../action/database.action")
const { isEmpty } = require("../config/help")
const SaveSlide = (req, res) => {
    var { id, name, od, name_link, status } = req.body;
    var photo = req.file.filename;
    var message = {};
    if (isEmpty(name)) {
        message.name = "name is require";
    } else if (isEmpty(photo)) {
        message.photo = "photo is require";
    } else if (isEmpty(od)) {
        message.od = "od is require";
    } else if (isEmpty(name_link)) {
        message.name_link = "name link is require"
    } else if (isEmpty(status)) {
        message.status = "Status is require"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
    } else {
        var sql = `SELECT COUNT(*) AS Count FROM tbl_slide WHERE name=?`;
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
                    const tbl = "tbl_slide";
                    const val = [name, photo, od, name_link, status]
                    const mark = "NULL,?"
                    SaveData(tbl, val, mark, res);
                }
            }
        })
    }
}
const GetSlide = (req, res) => {
    var { s, e } = req.body;
    const fld = "*";
    const tbl = "tbl_slide";
    var cond = "id > 0";
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
}
const TotalRecord = (req, res) => {
    var { id } = req.body;
    const tbl = "tbl_slide";
    var cond = "id>?";
    val = 0;
    CountData(tbl, cond, val, res);
};
const GetAutoID = (req, res) => {
    //(tbl, fld, od, res
    const tbl = "tbl_slide";
    var fld = "id";
    var od = "id DESC";
    AutoGetID(tbl, fld, od, res);
};
const UpdateSlide = (req, res) => {
    var { name, od, name_link, status, id } = req.body;
    var message = {};
    var photo = req.file.filename;
    if (isEmpty(name)) {
        message.name = "name is require";
    } else if (isEmpty(photo)) {
        message.photo = "photo is require";
    } else if (isEmpty(od)) {
        message.od = "order by is require";
    } else if (isEmpty(name_link)) {
        message.name_link = "Name Link is require";
    } else if (isEmpty(status)) {
        message.status = "status is require";
    } else if (isEmpty(id)) {
        message.CheckID = "id is require to check condition ";
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message,
        });
    } else {
        var sql = `SELECT COUNT(*) AS Count FROM tbl_slide WHERE name=? && id != ?`;
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
                    const tbl = "tbl_slide";
                    var fld = `name=?,photo=?,od=?,name_link=?,status=?`;
                    var val = [name, photo, od, name_link, status, id];
                    var cond = "id = ?";
                    UpdateList(tbl, fld, cond, val, res);
                }
            }
        })
    }
}
const CountSlide = (req, res) => {
    const tbl = "tbl_slide";
    const cond = "status=?";
    const val = 1;
    CountData(tbl, cond, val, res)
}
module.exports = { SaveSlide, GetSlide, TotalRecord, GetAutoID, UpdateSlide, CountSlide }