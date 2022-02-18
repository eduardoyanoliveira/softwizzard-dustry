import { findsByField, makeListByField, intersect } from "../gridMethods";
import { formatDate } from "../formMethods";


export const getSearchDataProduction = (machineList, productionOperatorList, producitonList) => {
    // Cleans the state
    const result = [];

    if(machineList.length <= 0){
        console.log('machineList can not be empty');
        return result;
    }

    if(producitonList.length <= 0){
        console.log('productionList can not be empty');
        return result;
    }

    // If the user is an operator, filter only the orders that the user is established
    let allowedOrders;
    if(JSON.parse(localStorage.getItem('is_operator'))){
        allowedOrders = findsByField('operator_id', JSON.parse(localStorage.getItem('operator_id')), productionOperatorList);
    }

    // If the user is operator, allow only the produciton orders that is bonded with him
    let orders;
    if(JSON.parse(localStorage.getItem('is_operator'))){
        orders = intersect('id', producitonList, makeListByField(allowedOrders, 'order_id'));
    }else{
        orders = producitonList;
    }
    
    for(let i in orders){
        let machine = findsByField('id', producitonList[i].machine_id, machineList)[0].name;
        result.push(
            {
                id: orders[i].id,
                machine: machine,
                leader_id: orders[i].leader_id,
                start: formatDate(new Date(orders[i].start)),
            }
        );
    }

    return result;
};