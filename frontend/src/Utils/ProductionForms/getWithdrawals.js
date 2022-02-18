import { tableToJson } from "../gridMethods";

export const getWithdrawals = (tableId, tableCols, productionWithdrawalsList) => {
    const result = [];

    const tableData = document.getElementById(tableId) && tableToJson(document.getElementById(tableId), tableCols);
    for(let i in tableData){
        if(tableData[i].id > productionWithdrawalsList.length ){
            result.push(  
                {
                    id: tableData[i].product_id,
                    quantity: tableData[i].quantity
                }
            );
        }  
    };

    return result;
};
