"use strict"

const mysql = require('mysql')

const dbconfig = require('../config')

const env = process.env.NODE_ENV || 'development'

let config

if(env === 'production'){

    config = dbconfig.mysql

}else{

    config = dbconfig.mysql2

}

module.exports = (SQL_QUERY) => {
    return new Promise((resolve, reject) => {
        try{
            const mysqlConn = mysql.createConnection(config);
            mysqlConn.connect();
            mysqlConn.query(SQL_QUERY, function (err, result) {
                mysqlConn.end();
                if(err) reject(err);
                else resolve(result);
            });
        }catch(e){
            reject(e)
        }
    })
}