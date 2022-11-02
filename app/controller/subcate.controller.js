const { AutoGetID, CountData, GetList, SaveData, UpdateList, Search } = require("../action/database.action");
const { isEmpty } = require("../config/help");
const db = require("../config/db.connect")
const tbl = "tbl_sub_category"
const SaveSubCate = (req, res) => {
    var { cate_id, name, od, name_link, status } = req.body;
    var message = {};
    var photo = " ";
    if (!req.file) {
        message.photo = " No upload file";
    } else {
        photo = req.file.filename;
    }
    if (isEmpty(cate_id)) {
        message.cate_id = "Category ID is require"
    } else if (isEmpty(name)) {
        message.name = "name is require"
    } else if (isEmpty(od)) {
        message.od = "od is require"
    } else if (isEmpty(name_link)) {
        message.name_link = "name_link is require"
    } else if (isEmpty(status)) {
        message.status = "status is require"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
    } else {
        var sql = `SELECT COUNT(*) AS Count FROM ${tbl} WHERE name=?`;
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
                    const val = [cate_id, name, photo, od, name_link, status]
                    const mark = "NULL,?"
                    SaveData(tbl, val, mark, res);
                }
            }
        })
    }
}
const GetSubCate = (req, res) => {
    //GetList = (fld, tbl, s, e, cond, od, res)
    var { s, e } = req.body
    var fld = `tbl_sub_category.id,
    tbl_sub_category.cate_id,
    tbl_sub_category.name AS 'Sub Category Name',
    tbl_sub_category.photo,
    tbl_sub_category.od,
    tbl_sub_category.status,
    tbl_category.name AS 'Category Name'`;
    var od = "tbl_sub_category.id ";
    var cond = "tbl_sub_category.id >0"
    var tbl1 = `tbl_sub_category INNER JOIN tbl_category ON tbl_sub_category.cate_id = tbl_category.id`;
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
        GetList(fld, tbl1, s, e, cond, od, res);
    }
}
const SearchCateByName = (req, res) => {
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
        var fld = `tbl_sub_category.id,
        tbl_sub_category.cate_id,
        tbl_sub_category.name AS 'Sub Category Name',
        tbl_sub_category.photo,
        tbl_sub_category.od,
        tbl_sub_category.status,
        tbl_category.name AS 'Category Name'`;
        var od = "tbl_sub_category.id DESC";
        var cond = `tbl_sub_category.name LIKE '%${name}%' `
        var tbl = `tbl_sub_category INNER JOIN tbl_category ON tbl_sub_category.cate_id = tbl_category.id`;
        Search(fld, tbl, cond, od, s, e, res);
    }
}
const SearchCateByID = (req, res) => {
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
        var fld = `tbl_sub_category.id,
        tbl_sub_category.cate_id,
        tbl_sub_category.name AS 'Sub Category Name',
        tbl_sub_category.photo,
        tbl_sub_category.od,
        tbl_sub_category.status,
        tbl_category.name AS 'Category Name'`;
        var od = "tbl_sub_category.id DESC";
        var cond = `tbl_sub_category.id LIKE '%${id}%' `
        var tbl = `tbl_sub_category INNER JOIN tbl_category ON tbl_sub_category.cate_id = tbl_category.id`;
        Search(fld, tbl, cond, od, s, e, res);
        Search(fld, tbl, cond, od, s, e, res);
    }
}
const AutoGetSubCateID = (req, res) => {
    var fld = "id";
    var od = "id DESC";
    AutoGetID(tbl, fld, od, res);
}
const TotalRecord = (req, res) => {
    const cond = "id>0";
    CountData(tbl, cond, res)
}
const UpdateSubCate = (req, res) => {
    var { id, cate_id, name, od, name_link, status } = req.body;
    var message = {};
    var photo = "";
    if (!req.file) {
        message.photo = " No upload file";
    } else {
        photo = req.file.filename;
    }
    if (isEmpty(name)) {
        message.name = "name is require";
    } else if (isEmpty(od)) {
        message.od = "order by is require";
    } else if (isEmpty(name_link)) {
        message.name_link = "Name Link is require";
    } else if (isEmpty(status)) {
        message.status = "status is require";
    } else if (isEmpty(id)) {
        message.id = "id is require to check condition ";
    } else if (isEmpty(cate_id)) {
        message.cate_id = "Category ID is require"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message,
        });
    } else {
        var sql = `SELECT COUNT(*) AS Count FROM ${tbl} WHERE name=? && id != ?`;
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
                    var fld = `cate_id=?,name=?,photo=?,od=?,name_link=?,status=?`;
                    var val = [cate_id, name, photo, od, name_link, status, id];
                    var cond = "id = ?";
                    UpdateList(tbl, fld, cond, val, res);
                }
            }
        })
    }
}
module.exports = {
    SaveSubCate,
    GetSubCate,
    AutoGetSubCateID,
    TotalRecord,
    UpdateSubCate,
    SearchCateByID,
    SearchCateByName
}