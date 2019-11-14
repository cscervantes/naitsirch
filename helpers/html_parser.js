const request = require('request').defaults({json:true});

const S = require('string');

const cheerio = require('cheerio');

module.exports.HTML = (URL) => {
    return new Promise((resolve, reject) => {
        try{
            request.get(URL, (error, response, body) => {
                let $ = cheerio.load(body)
                const anchors = []
                $('body a').map((i, e)=>{
                    // console.log($(e).get(0).tagName)
                    anchors[i] = {'tag':$(e).get(0).tagName, 'href': $(e).get(0).attribs.href, 'text': S($(e).text()).collapseWhitespace().s}
                })
                console.log(anchors)
                if(error) reject(error);
                else resolve(body);
            })
        }catch(e){
            reject('HTML' ,e)
        }
    })
}