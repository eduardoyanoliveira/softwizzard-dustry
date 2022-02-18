import { findsByField } from "../gridMethods";

export const getCurrentProducts = (productList, producitonProductList) => {

    const result = [];

    if(productList.length <= 0){
        console.log('productList can not be empty');
        return;
    }

    for(let i in producitonProductList){
        // Adds The saved value as true on already registered items ,if this value is true the list component won't shows the delete option
        let dict = {...findsByField('id', producitonProductList[i]['product_id'], productList)}
        // Adds the already established products on the state , to be selectable on the withdrawals
        dict[0].saved = true
        result.push(dict[0]);
    }

    return result;
}