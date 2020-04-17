'use strict'
let str="37yIYGPbcXpCDuXRi8jpID%2FdCHA7Z4WpoSFNvFRSAd2e%2F6I7FIYF%2Bs7bLcA3vPDBcTqmuMV%2FtOb9%0ATQvqjmKvPyXsj3PqM7O3CiUmdIq%2BHl7rV06lZJcSXpLzP75JUFFt2pRdPvdopDEnAG6nJXzOuCbx%0A5UeiWXloIjOflCfb5FYeZc6sIXwZugvyEO6IswfgSsongxLrQv0NnvbK2Wbq5He7vnwROfKBrFdn%0AMuJFrVn9P%2FVnQVDsFyfNTioc8A1h7s7KHGJzMK1cb6xbzKzCY1DC8iUHjE23Qz%2F6kHwckjLhQiib%0A%2FuQ8xQ%3D%3D|" +
    "预订|240000G1010P|G101|VNP|AOH|VNP|AOH|06:36|12:40|06:04|Y|Q7ct86fh55Cymz7sSpBPVRbIEG0N6ysubBT%2BPDny%2F%2BlrbR89|20200419|3|P2|01|11|1|0|||||||||||有|有|无||O0M090|OM9|1|1|||||||||\n";
let str1="|预订|240000G1070J|G107|VNP|AOH|VNP|AOH|08:05|13:46|05:41|Y" +
    "|%2FMtj01R26qcnuFDuZ0SitBloO4LzbCC1dvRoThY1MKprsw2h|20200430|3|P3|01|09|1|0||||||||||" +
    "|有|14|10||O0M090|OM9|0|0|||||||||\","
let arr=str1.split("|");
let str2="uquuT%2BJD0hPAR3JW7FWDmLShR5MGn2X2757qfxzZwq8lK6XWsRJlSJrdN5%2FmOn967qKyGM077a66%0Aisaz8uEfnB6wkAm5kauO7hrgdviPdp9HXr%2FN9RCSN%2F%2FGQSwbXk4%2B1cRSxaJ5t8SzOOpIFWe33ZVR%0AtPFaME1YI09ugOqPfEUxjp4bq%2FDZagkt3nw1IylFfIinPiDDZ8haTfB%2BoVULMP%2FRN1%2BshggYV9dI%0A7vxgiLJ%2BhyXgHvkael%2BgAV3N4cINcnrc6EiRLum4Rbw5kSGRrKLi%2BjIO4QkIHYVBRh6m%2F69fPlJI%0Aw5My9Q%3D%3D|" +
    "预订|240000G1050O|G105|VNP|AOH|VNP|AOH|07:20|13:08|05:48|Y|TUsxJaLvufWCWZBlEtYW2lVb%2BkykpS72F8VdHtCsfTHARiS6|20200419|3|P4|01|10|1|0|||||||||||有|13|4||O0M090|OM9|1|0|||||||||";
let arr2=str2.split("|");
let [state,trainNum,startTime,endTime,duration,first_class_seat,second_class_seat]=
    [arr[1],arr[3],arr[8],arr[9],arr[10],arr[31],arr[30]]
console.log(first_class_seat);
