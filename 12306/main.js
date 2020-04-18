"use strict"
const retrieve=require('./../retrieve');
const mail=require('./../send/mail');
let url='https://kyfw.12306.cn/otn/leftTicket/query?leftTicketDTO.train_date=2020-04-30&leftTicketDTO.from_station=BJP&leftTicketDTO.to_station=SHH&purpose_codes=ADULT';

async function main() {
    let responseData=await retrieve.get(url);
    let results=JSON.parse(responseData).data.result;
    let str='';
    results.forEach((result,index,array)=>{
        let arr=result.split('|');
        let [state,trainNum,startTime,endTime,duration,first_class_seat,second_class_seat]=
            [arr[1],arr[3],arr[8],arr[9],arr[10],arr[31],arr[30]];
        console.log(`车次:${trainNum} 二等座：${second_class_seat}`);
        str += `车次:${trainNum} 二等座：${second_class_seat}\n`
    })
    return str;
};
main().then((str)=>{
    console.log("-----------end----------------"+str)
    mail.send(str);
});