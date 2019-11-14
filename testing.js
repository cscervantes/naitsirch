"use strict"

const sql_helper = require('./helpers/queries')
const extractor = require('./helpers/html_parser')
const S = require('string')

function secured_and_unsecured_format(URL){
    let unsecured, secured;
    const _url = S(URL).replaceAll('http://', '').replaceAll('https://', '').s
    unsecured = S(_url).ensureLeft('http://').s
    secured = S(_url).ensureLeft('https://').s
    return [unsecured, secured]
}

async function getActiveWesbsites(){
    try{
        let activeWebsites = await sql_helper.ACTIVE_WEBSITES()
        let mapWebsite = activeWebsites.map(({pub_id, pub_url}) => {return {pub_id:pub_id, pub_url:pub_url.trim()}})
        mapWebsite.forEach(async element => {
            let countResult = await sql_helper.FIND_BY_FQDN(element.pub_url)
            console.log(element.pub_url, countResult)
        });
    }catch(e){
        console.error('getActiveWesbsites',e)
    }
}

async function storeRaw(){
    try{
        const data = [
            {
                "mwe_src_url":"stackoverflow.com",
                "mwe_full_url":"https://stackoverflow.com/questions/5349425/whats-the-fastest-way-to-loop-through-an-array-in-javascript",
                "mwe_status": "Test"
            }
        ]
        const secure_url = secured_and_unsecured_format(data[0].mwe_full_url)[1]
        const unsecure_url = secured_and_unsecured_format(data[0].mwe_full_url)[0]
        console.log(secure_url, unsecure_url)
        let countRecord = await sql_helper.COUNT_ARTICLE_FROM_RAW(secure_url, unsecure_url)
        if(countRecord[0].total_count > 0){
            console.warn('Already exists!')
        }else{
            let store = await sql_helper.STORE_TO_MEDIA_RAW(data)
            console.log(store)
        }
    }catch(e){
        console.log('StoreRaw', e)
    }
}

async function parseHtml(){
    try{
        let html = await extractor.HTML(process.argv[2])
        // console.log(html)
    }catch(e){
        console.error('parseHtml', e)
    }
}

parseHtml()
// storeRaw()
// getActiveWesbsites()

