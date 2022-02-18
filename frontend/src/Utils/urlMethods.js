
export const getUrlParams = () => {

    if(window.location.toString().indexOf('?') < 0) return;
    const params = window.location.toString().split('?')[1].split('&');

    if(params[0] == false){
        return;
    };

    const paramArray = {};

    for(var i=0; i<params.length; i++) {                        
        var param = params[i].split('=');                       
        paramArray[param[0]] = param[1];
    }
    return paramArray;
}
    