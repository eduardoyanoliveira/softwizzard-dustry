

export const reloadScreen = (timeout = 2000) => {
    setTimeout(() => {
        window.location.reload();
    },timeout);
};

export const arrayToState = (array) => {

    let str = '{';
    for(let i in array){
        str += `"${array[i].name}" : ${array[i].value},`;
    };

    let str_t = str.substring(0, str.length - 1);
    str_t += '}';

    const obj = JSON.stringify(str_t)
    return JSON.parse(obj)
} 

function addZeroToDate(numb){
    if (numb <= 9) 
        return "0" + numb;
    else
        return numb; 
}

export const formatDate  = (date, getTime = true) => {
    let fullDate = (addZeroToDate(date.getDate()).toString() + "/" + (addZeroToDate(date.getMonth()+1).toString()) + "/" + date.getFullYear());
    fullDate =  getTime ? fullDate + ' ' + addZeroToDate(date.getHours()) + ':' + addZeroToDate(date.getMinutes()) : fullDate;
    return fullDate;
}