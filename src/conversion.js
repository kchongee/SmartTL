const minuteInMs = 1000*60;
const hourInMs = minuteInMs*60;
const dayInMs = hourInMs*24;
const weekInMs = dayInMs*7;
const monthInMs = weekInMs*4;
const yearInMs = dayInMs*365;
const monthsAbbr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];

const asc = arr => arr.sort((a, b) => a - b);

const uniques = arr => [...new Set(arr)];

const filterNonUniqueBy = (arr, fn) => {
    return arr.filter((v, i) => arr.every((x, j) => (i === j) === fn(v, x, i, j)));
}  

const convertObjToObjArr = (obj,newKey="id") => {    
    if(obj && Object.keys(obj).length){
        var newArr = [];
        Object.keys(obj).map((key, index) => {     
            const newObj = {};
            newObj[newKey] = key;              
            newArr.push({...obj[key], ...newObj});
            return null;
        });                 
        return newArr;
    }
    return [];
}

const extractObjValToArr = (objArray,key) => {
    return objArray.length?objArray.map(a => a[`${key}`]):[];
}

const convertObjArrTimestamp = (objArr,timestampKey="timestamp") => {
    if(objArr && objArr.length){
        const diff = (new Date(objArr.slice(-1)[0][timestampKey]) - new Date(objArr[0][timestampKey]));        
        var convertFunction = () => {};
        if(diff<=hourInMs){
            convertFunction = convertToHourRangeString;
        }else if(diff<=dayInMs){
            convertFunction = convertToDayRangeString;
        }else if(diff<=monthInMs){
            convertFunction = convertToMonthRangeString;
        }else if(diff<=yearInMs){
            convertFunction = convertToYearRangeString;
        }else{
            convertFunction = convertToFullDateString;
        }            
        
        return objArr.map((obj, index) => {
            return {
                ...obj,
                "timestamp": convertFunction(new Date(obj[timestampKey]))
            }        
        });
    }
    return [];
}
const convertToFullDateString = (timestamp) => {
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth();
    const day = timestamp.getDate();
    return `${day} ${monthsAbbr[month]} ${year%100}`;
}
const convertToYearRangeString = (timestamp) => {                
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth();        
    return `${monthsAbbr[month]} ${year}`;
}
const convertToMonthRangeString = (timestamp) => {                
    const month = timestamp.getMonth();
    const day = timestamp.getDate();
    return `${day} ${monthsAbbr[month]}`;
}
const convertToDayRangeString = (timestamp) => {                
    const hour = timestamp.getHours();
    const minute = timestamp.getMinutes();
    return `${fillZero(hour)}:${fillZero(minute)}`;
}
const convertToHourRangeString = (timestamp) => {                
    const minute = timestamp.getMinutes();
    const second = timestamp.getSeconds();        
    return `${fillZero(minute)}:${fillZero(second)}`;
}
const fillZero = (time) => {        
    return time<10?"0"+time:time;
}

const findValuesInObjArray = (objArr, key, value) => {
   return objArr.filter(obj=>obj[key]===value);
}

const getAYearRangeMin = (timestamp) =>{
    return timestamp instanceof Date ? timestamp - yearInMs : new Date(timestamp) - yearInMs
}
const getAMonthRangeMin = (timestamp) =>{
    return timestamp instanceof Date ? timestamp - monthInMs : new Date(timestamp) - monthInMs
}
const getAHourRangeMin = (timestamp) =>{
    return timestamp instanceof Date ? timestamp - hourInMs : new Date(timestamp) - hourInMs
}
const getAMinuteRangeMin = (timestamp) =>{
    return timestamp instanceof Date ? timestamp - minuteInMs : new Date(timestamp) - minuteInMs
}

export {asc,uniques,filterNonUniqueBy,convertObjToObjArr,extractObjValToArr,convertObjArrTimestamp,convertToFullDateString,convertToDayRangeString,getAYearRangeMin,getAHourRangeMin,getAMonthRangeMin,getAMinuteRangeMin,findValuesInObjArray}