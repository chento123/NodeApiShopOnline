const {
    AutoGetID,
    CountData,
    GetList,
    SaveData,
    UpdateList,
    Search
} = require("../action/database.action");
const { isEmpty } = require("../config/help");
const tbl = "tbl_product"
const db = require("../config/db.connect")
const SaveProduct = (req, res) => {
    var { id, name, price, dis, price_dis, photo, sub_id, cate_id, slide_id, od, name_link, uid, des, click, status } = req.body;
    var message = {}
    var photo = "";
    if (!req.file) {
        message.photo = " No upload file";
    } else {
        photo = req.file.filename;
    }
    if (isEmpty(name)) {
        message.name = "name is require"
    } else if (isEmpty(price)) {
        message.price = "price is require"
    } else if (isEmpty(sub_id)) {
        message.sub_id = "sub category id is require"
    } else if (isEmpty(cate_id)) {
        message.cate_id = "category id is require"
    } else if (isEmpty(od)) {
        message.od = "od is require"
    } else if (isEmpty(name_link)) {
        message.name_link = "name link is require"
    } else if (isEmpty(uid)) {
        message.uid = "user id is require"
    } else if (isEmpty(des)) {
        message.des = "desciption is require"
    } else if (isEmpty(status)) {
        message.status = "status is require"
    } else if (isEmpty(dis)) {
        dis = 0
    } else if (isEmpty(price_dis)) {
        price_dis = 0
    } else if (isEmpty(click)) {
        click = 0
    } else if (isEmpty(slide_id)) {
        message.slide_id = "slide id is require"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
    } else {
        var sql = `SELECT COUNT(*) FROM ${tbl} WHERE name=?`
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
                    const val = [name, price, dis, price_dis, photo, sub_id, cate_id, slide_id, od, name_link, uid, des, click, status]
                    const mark = "NULL,?"
                    SaveData(tbl, val, mark, res);
                }
            }
        })
    }
}
const GetProduct = (req, res) => {
    var { s, e } = req.body;
    var tbl1 = ` 
    tbl_product INNER JOIN tbl_user ON tbl_product.uid=tbl_user.id 
    INNER JOIN tbl_category ON tbl_category.id=tbl_product.cate_id 
    INNER JOIN tbl_sub_category ON tbl_product.sub_id=tbl_sub_category.id`;
    var fld = ` 
        tbl_category.name AS Category,
        tbl_sub_category.name AS "Sub Category",
        tbl_user.fullname,
        tbl_product.id,
        tbl_product.name AS Product,
        tbl_product.price,
        tbl_product.dis,
        tbl_product.price_dis,
        tbl_product.od,
        tbl_product.photo,
        tbl_product.status`;
    var cond = "tbl_product.id >= 0";
    var od = "tbl_product.id ";
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
const TotalRecord = (req, res) => {
    const tbl = "tbl_product";
    var cond = "id > 0";
    CountData(tbl, cond, res);
};
const GetAutoID = (req, res) => {
    //(tbl, fld, od, res
    var fld = "id";
    var od = "id DESC";
    AutoGetID(tbl, fld, od, res);
};


const UpdateProduct = (req, res) => {
    var { id, name, price, dis, price_dis, sub_id, cate_id, slide_id, od, name_link, uid, des, click, status } = req.body;
    var message = {};
    var photo = "";
    if (!req.file) {
        message.photo = " No upload file";
    } else {
        photo = req.file.filename;
    }
    if (isEmpty(name)) {
        message.name = "name is require"
    } else if (isEmpty(price)) {
        message.price = "price is require"
    } else if (isEmpty(photo)) {
        message.dis = "photo is require"
    } else if (isEmpty(sub_id)) {
        message.sub_id = "sub category id is require"
    } else if (isEmpty(cate_id)) {
        message.cate_id = "category id is require"
    } else if (isEmpty(od)) {
        message.od = "od is require"
    } else if (isEmpty(name_link)) {
        message.name_link = "name link is require"
    } else if (isEmpty(uid)) {
        message.uid = "user id is require"
    } else if (isEmpty(des)) {
        message.des = "desciption is require"
    } else if (isEmpty(status)) {
        message.status = "status is require"
    } else if (isEmpty(dis)) {
        dis = 0
    } else if (isEmpty(price_dis)) {
        price_dis = 0
    } else if (isEmpty(click)) {
        click = 0
    } else if (isEmpty(id)) {
        message.id = "id is require"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message,
        });
    } else {
        var sql = `SELECT COUNT(*) AS Count FROM tbl_product WHERE name=? && id != ?`;
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
                    const tbl = "tbl_product";
                    var fld = ` name=?, price=?, dis=?, price_dis=?, photo=?, sub_id=?, cate_id=?, slide_id=?, od=?, name_link=?, uid=?, des=?, click=?, status=? `;
                    var val = [name, price, dis, price_dis, photo, sub_id, cate_id, slide_id, od, name_link, uid, des, click, status, id];
                    var cond = "id = ?";
                    UpdateList(tbl, fld, cond, val, res);
                }
            }
        })
    }
}
const SearchProductByName = (req, res) => {
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
        var tbl = ` 
    tbl_product INNER JOIN tbl_user ON tbl_product.uid=tbl_user.id 
    INNER JOIN tbl_category ON tbl_category.id=tbl_product.cate_id 
    INNER JOIN tbl_sub_category ON tbl_product.sub_id=tbl_sub_category.id`;
        var fld = ` 
        tbl_category.name AS Category,
        tbl_sub_category.name AS "Sub Category",
        tbl_user.fullname,
        tbl_product.id,
        tbl_product.name AS Product,
        tbl_product.price,
        tbl_product.dis,
        tbl_product.price_dis,
        tbl_product.od,
        tbl_product.photo,
        tbl_product.status`;
        const cond = `tbl_product.name LIKE '%${name}%'`;
        var od = "tbl_product.id DESC";
        Search(fld, tbl, cond, od, s, e, res);
    }
}
const SearchProductByID = (req, res) => {
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
        var tbl = ` 
        tbl_product INNER JOIN tbl_user ON tbl_product.uid=tbl_user.id 
        INNER JOIN tbl_category ON tbl_category.id=tbl_product.cate_id 
        INNER JOIN tbl_sub_category ON tbl_product.sub_id=tbl_sub_category.id`;
        var fld = ` 
            tbl_category.name AS Category,
            tbl_sub_category.name AS "Sub Category",
            tbl_user.fullname,
            tbl_product.id,
            tbl_product.name AS Product,
            tbl_product.price,
            tbl_product.dis,
            tbl_product.price_dis,
            tbl_product.od,
            tbl_product.photo,
            tbl_product.status`;
        const cond = `tbl_product.id LIKE '%${id}%'`;
        var od = "tbl_product.id DESC";
        Search(fld, tbl, cond, od, s, e, res);
    }
}
module.exports = {
    SaveProduct,
    GetProduct,
    TotalRecord,
    GetAutoID,
    UpdateProduct,
    SearchProductByID,
    SearchProductByName
}