import { findsByField } from "../gridMethods";

export const loadOperators = (data, operatorList) => {
    const result = [];

    if(operatorList <= 0){
        console.log('operatorList can not be empty');
        return result;
    }

    for(let i in data){
        // Adds The saved value as true on already registered items ,if this value is true the list component won't shows the delete option
        let dict = {...findsByField('id', data[i]['operator_id'], operatorList)};
        dict[0].saved = true;
        result.push(
            dict[0]
        );
    }    

    return result;
};