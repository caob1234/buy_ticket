'use strict'
const https = require('https');
const iconv = require('iconv-lite');

const headers = {
    "X-Requested-With": "XMLHttpRequest",//ajax请求会添加该request header
    "Accept-Encoding": "compress",
    Cookie: "JSESSIONID=DC250FDEC85AA60C8896AC04E0C97FBC; _jc_save_wfdc_flag=dc; RAIL_EXPIRATION=1587311168021; RAIL_DEVICEID=SjDheFftfOAskIWK9kgClMiqqjnzNzML2P2qhc4ly47H3xiFpTy8gBaZW9NtBl77iKeIcw3E1_q-NkcuXeOzUONArETUgu2uoyMXa-PlwIJm6NG3dpN9Wdah0SuAZG1awjVti6LUF-d5PENOWlW2yDolfq-pJIy5; BIGipServerpool_passport=267190794.50215.0000; route=c5c62a339e7744272a54643b3be5bf64; _jc_save_toDate=2020-04-16; BIGipServerotn=468713994.64545.0000; _jc_save_fromStation=%u5317%u4EAC%2CBJP; _jc_save_toStation=%u4E0A%u6D77%2CSHH; _jc_save_fromDate=2020-04-30",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
};
const options = {
    headers: headers
}

function request(url, opt) {
    return new Promise((resolve, reject) => {
        https.get(url, opt, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
            let chunks = [], size = 0;
            res.on('data', (d) => {
                chunks.push(d);
                size += d.length;
            });
            res.on("end", () => {
                let buf = Buffer.concat(chunks, size);
                let str = iconv.decode(buf, 'utf8');
                resolve(str);
            })
        }).on('error', (e) => {
            reject(e)
        });
    })
};
module.exports = {
    request,
    async get(url) {
        // Object.assign(options,{method:'GET'});
        return await request(url, options);
    }
}
