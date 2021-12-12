import {asc} from "./conversion";

const sum = (arr) => [...arr].reduce((acc, val) => acc + val, 0);

const average = (array) => (array.reduce((a, b) => a + b) / array.length).toFixed(2);

const median = arr => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? (nums[mid]).toFixed(2) : ((nums[mid - 1] + nums[mid]) / 2).toFixed(2);
};

var mode = arr => {
    var counts = {};
    for (let i = 0; i < arr.length; i++) {
        counts[arr[i]] = (counts[arr[i]] || 0) + 1
    }
    var max = 0;
    var values = [];
    for (var key in counts) {
        if (counts.hasOwnProperty(key)) {
            if (counts[key] > max) {
                max = counts[key];
                values = [key];
            } else if (counts[key] === max) {
                max = counts[key];
                values.push(key);
            }
        }
        if(values.length>(arr.length/2)){
            values = [];
            max = 0;
            break;
        }
    }    
    return {"values":values, "count":max};    
};

const firstQuartile = (arr) => {
    return quantile(arr,0.25);
};

const secondQuartile = (arr) => {
    return quantile(arr,0.5);
};

const thirdQuartile = (arr) => {
    return quantile(arr,0.75);
};

const quantile = (arr, q) => {
    const sorted = asc(arr);
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
        return sorted[base];
    }
};

const variance = (arr = []) => {
    if(!arr.length){
       return 0;
    };
    const sum = arr.reduce((acc, val) => acc + val);
    const { length: num } = arr;
    const median = sum / num;
    let variance = 0;
    arr.forEach(num => {
       variance += ((num - median) * (num - median));
    });
    variance /= num;
    return variance.toFixed(2);
};

const standardDeviation = (arr, usePopulation = false) => {
    const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
    return Math.sqrt(
      arr
        .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
        .reduce((acc, val) => acc + val, 0) /
        (arr.length - (usePopulation ? 0 : 1))
    ).toFixed(2);
};

const calcRateChange = (currVal,pastVal) =>{
    return Math.round((currVal-pastVal)/currVal*100.0);
}

// var resultProductData = product_data.filter(function (a) {
//     var hitDates = a.ProductHits || {};
//     // extract all date strings
//     hitDates = Object.keys(hitDates);
//     // convert strings to Date objcts
//     hitDates = hitDates.map(function(date) { return new Date(date); });
//     // filter this dates by startDate and endDate
//     var hitDateMatches = hitDates.filter(function(date) { return date >= startDate && date <= endDate });
//     // if there is more than 0 results keep it. if 0 then filter it away
//     return hitDateMatches.length>0;
// });

export {sum,average,median,mode,firstQuartile,secondQuartile,thirdQuartile,variance,standardDeviation,calcRateChange};