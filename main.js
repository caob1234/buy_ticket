"use strict"
const process=require('process');
const request = require('request');
const iconv = require('iconv-lite');
const fs = require('fs');
const from = 10;
const end = 16;

const App = require('alidayu-node');
const app = new App('App Key', 'App Secret');

const url = 'https://trains.ctrip.com/TrainBooking/Ajax/SearchListHandler.ashx?Action=getSearchList';
const postData = {
    "IsBus": false,
    "Filter": "0",
    "Catalog": "",
    "IsGaoTie": false,
    "IsDongChe": false,
    "CatalogName": "",
    "DepartureCity": "wuxixinqu",
    "ArrivalCity": "dingxi",
    "HubCity": "",
    "DepartureCityName": "无锡新区",
    "ArrivalCityName": "定西",
    "DepartureDate": "2020-04-03",
    "DepartureDateReturn": "2020-04-09",
    "ArrivalDate": "",
    "TrainNumber": ""
};

const options = {
    encoding: null,
    method: 'POST',
    url: url,
    form: {
        value: JSON.stringify(postData)
    },
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded:charset=gb2312',
    }
};
const crawl = () => {
    return new Promise((resolve, reject) => {
        request.post(options, (error, response, body) => {
            if (response.statusCode === 200) {
                resolve(body);
            } else {
                reject(new Error(response.statusCode))
            }
        });
    })
};
function main(){
    setInterval(function () {
        console.log('setInterval-Search From:', new Date().toString() + '\n');
        fs.appendFile('log.txt', new Date().toString() + '\n', '', (openErr) => {
            if (openErr != null) console.log(openErr);
        });
        crawl()
            .then((body) => {
                let list = JSON.parse(iconv.decode(body, "gb2312")).TrainItemsList;
                showList(list);
            })
            .catch(error => console.error(error));
    }, 30000);
}


function parseList(list) {
    let newList = [];
    for (let i = 0; i < list.length; i++) {
        let start = Number(list[i].StratTime.split(':')[0]);
        let Inventory = list[i].SeatBookingItem[0].Inventory;
        if (start > from && start < end && Inventory === 0) {
            newList.push(list[i]);
        }
    }
    return newList;
}

function showList(list) {
    if (list.length === 0) {
        console.log('No data found\n');
        fs.appendFile('log.txt', 'No data found\n', '', (openError) => {
            if (openError != null) console.log(openError);
        });
    } else {
        sendSMS(list);
        for (let i = 0; i < list.length; i++) {
            let TrainName = list[i].TrainName;
            let StartStationName = list[i].StartStationName;
            let EndStationName = list[i].EndStationName;
            let StratTime = list[i].StratTime;
            let EndTime = list[i].EndTime;
            let Inventory = list[i].SeatBookingItem[0].Inventory;
            let str = '车次：' + TrainName + ' 开始：' + StartStationName + ' 到达：' + EndStationName + ' 出发时间：' + StratTime + ' 到达时间：' + EndTime + ' 余票：' + Inventory + '\n';
            console.log("得到的信息============== " + str);
            // fs.appendFile('log.txt', str);
        }
    }
}

function sendSMS(list) {
    let trainNames = list[0].TrainName;
    let numbers = list[0].SeatBookingItem[0].Inventory;
    let message = JSON.stringify({
        "name": "lrh",
        "trainName": trainNames,
        "number": numbers
    });

    let smsOptions = {
        sms_free_sign_name: '提示信息',
        sms_param: message,
        rec_num: '81193903',
        sms_template_code: 'SMS_39010188'
    };
    app.smsSend(options);
}

main();
