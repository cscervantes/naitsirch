"use strict"

const Q = require('../database/sql') // Q stands for sql queries

let transactions = {}

transactions.ACTIVE_WEBSITES = async () => {
   try{
        const query = {
            "sql": "SELECT * FROM publication LIMIT 10"
        }
        let db = await Q(query)
        return db
   }catch(e){
       return e
   }
}

transactions.FIND_BY_FQDN = async (FQDN) => {
    try{
        const query = {
            "sql": `SELECT COUNT(*) FROM publication WHERE pub_url = "${FQDN}"`
        }
        return await Q(query)
    }catch(e){
        return e
    }
}

transactions.STORE_TO_MEDIA_RAW = async (DATA) => {
    try{
        const query = {
            "sql": "INSERT INTO media_web_raw SET ?",
            "values": DATA
        }
        return await Q(query)
    }catch(e){
        return e
    }
}

transactions.COUNT_ARTICLE_FROM_RAW = async (secured_url, unsecured_url) => {
    try{
        const query = {
            "sql": `SELECT COUNT(*) as total_count FROM media_web_raw WHERE mwe_full_url = "${secured_url}" OR mwe_full_url = "${unsecured_url}" `
        }
        return await Q(query)
    }catch(e){
        return e
    }
}


module.exports = transactions