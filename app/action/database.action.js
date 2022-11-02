const db = require("../config/db.connect");
const { isEmpty } = require("../config/help");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const GetList = (fld, tbl, s, e, cond, od, res) => {
    // $sql = "SELECT $fld FROM $tbl WHERE $cond ORDER BY $od  LIMIT $s,$e";
    var sql = `SELECT ${fld} FROM ${tbl}  WHERE ${cond} ORDER BY ${od} DESC  LIMIT ${s},${e} `;
    db.query(sql, (err, result, fld) => {
        if (err) {
            res.json({
                error: true,
                message: err,
            });
        } else {
            res.json({
                error: false,
                result: result,
            });
        }
    });
};
const Search = (fld, tbl, cond, od, s, e, res) => {
    var sql = `SELECT ${fld} FROM ${tbl} WHERE ${cond} ORDER BY ${od} LIMIT ${s},${e}`;
    db.query(sql, (err, result, fld) => {
        if (err) {
            res.json({
                error: true,
                message: err,
            });
        } else {
            res.json({
                error: false,
                total: result.length,
                result: result,
            });
        }
    })
}
const SaveData = (tbl, val, mark, res) => {
    var sql = `INSERT INTO ${tbl} VALUES(${mark})`;
    db.query(sql, [val], (err, result, fld) => {
        if (err) {
            res.json({
                error: true,
                message: err,
            });
        } else {
            res.json({
                error: false,
                message: "Save Sucess",
                result: result,
            });
        }
    });
};
const CountData = (tbl, cond, res) => {
    var sql = `SELECT COUNT(*) AS total FROM ${tbl} WHERE ${cond}`;
    db.query(sql, (err, result, fld) => {
        if (!err) {
            res.json({
                error: false,
                message: result,
            });
        } else {
            res.json({
                error: true,
                message: err,
            });
        }
    });
};
const AutoGetID = (tbl, fld, od, res) => {
    var sql = `SELECT ${fld} FROM ${tbl} ORDER BY ${od} LIMIT 0,1;`;
    db.query(sql, (err, result, fld) => {
        if (err) {
            res.json({
                error: true,
                message: err,
            });
        } else {
            res.json({
                error: false,
                message: result,
            });
        }
    });
};
const UpdateList = (tbl, fld, cond, val, res) => {
    var sql = `UPDATE ${tbl} SET ${fld} WHERE ${cond}`;
    db.query(sql, val, (err, result, fld) => {
        if (err) {
            res.json({
                error: true,
                message: err,
            });
        } else {
            res.json({
                error: false,
                message: "Update Sucess !!!",
            });
        }
    });
};

module.exports = {
    GetList,
    SaveData,
    CountData,
    AutoGetID,
    UpdateList,
    Search
};