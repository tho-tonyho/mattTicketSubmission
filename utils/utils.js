import {createRequire} from "module";
const require = createRequire(import.meta.url);
const config = require("../config.json")

export const getDateTime = () => {
    const date = new Date
    var hours = date.getHours();
    var minutes = date.getMinutes();
    let seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds <= 10 ? '0' + seconds : seconds;
    var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;

    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let year = date.getFullYear();

    let datetime =  `${month}.${day}.${year} ${strTime}`
    return datetime;
}

export const convertSQLDatetime = (sqlDatetime) => {
    const date = new Date(sqlDatetime);
    date.setHours(date.getHours() + 4);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    let timeString = date.toLocaleTimeString('en-US', options);
    const ampm = date.getHours() < 12 ? 'AM' : 'PM';
    timeString = timeString.slice(0, -3) + ' ' + ampm;
    return `${timeString}`;
}

export const dateTimeLog = () => {
    const date = new Date
    var hours = date.getHours();
    var minutes = date.getMinutes();
    let seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds <= 10 ? '0' + seconds : seconds;
    var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
  
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let year = date.getFullYear();
  
    let datetime =  `${month}.${day}.${year} ${strTime}`
    return datetime;
}

export const environment = (env) => {
    if(env === "PROD"){
        return {
            url: config.PROD_snowBaseUrl,
            pw: config.PROD_snowPw
        }
    } else if(env === "DEV"){
        return {
            url: config.DEV_snowBaseUrl,
            pw: config.DEV_snowPw
        }
    } else{
        return {
            url: config.DEV_snowBaseUrl,
            pw: config.DEV_snowPw
        }
    }
}