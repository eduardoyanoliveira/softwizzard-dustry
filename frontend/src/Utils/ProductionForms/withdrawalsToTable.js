import { findsByField } from "../gridMethods";

export const withdrawalsToTable = (productionWithdrawalsList, productList) => {

    const result = [];

    if(productionWithdrawalsList.length <= 0){
        console.log('productionWithdrawalsList can not be empty');
        return result;
    }

    for(let i in productionWithdrawalsList){
        result.push( 
            {
                id: Number(i) + 1,
                product_id: productionWithdrawalsList[i]['product_id'], 
                name: findsByField('id', productionWithdrawalsList[i]['product_id'], productList)[0]['name'],
                quantity: productionWithdrawalsList[i]['qty'],
            }
        );
    };

    return result;
};