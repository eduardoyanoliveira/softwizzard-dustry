export function tableToJson(table, cols) {
  const data = [];
  const headers = [];

  for( let i in cols){
    headers.push(cols[i].name)
  }

  // go through cells
  for (let i=1; i<table.rows.length; i++) {

    let tableRow = table.rows[i];
    let rowData = {};

    for (let j=0; j < tableRow.cells.length; j++) {

      let value = tableRow.cells[j].innerHTML;

      if( j >= headers.length){
        rowData['deletable'] = /<\/?[a-z][\s\S]*>/i.test(value) ? true : false;
        continue;
      }

      if(!isNaN(Number(value))){
        value = Number(value);
      }

      if(!/<\/?[a-z][\s\S]*>/i.test(value)){
        rowData[ headers[j] ] = value;
      }
    }
    data.push(rowData);
  }       

  return JSON.parse(JSON.stringify(data));
}


export const getAllKeys = (data) => {
  let result = [];

  for(let index in data){
    let keys = Object.keys(data[index]);
    result.push(...keys);
  }

  result = [...new Set(result)];
  return result;

};

const hasKey = (dataset, key) => {

  let contains = false;
  const keys = getAllKeys(dataset);

  for(let index in keys){
    if(keys[index] === key.toString()) contains = true;
  }

  return contains;
}

export const findsNull = (field , data) => {

  field = field.toLowerCase();

  const func = (obj) => {
    return  obj[field] === null;
  };

  return data.filter(func);
};

export const findsByField = (field , value , data, exact = true) => {

  field = field.toLowerCase();

  const func = (obj) => {
    if(!exact){
       return obj[field].toLowerCase()  === value.toLowerCase()
    }else{
      return  obj[field] === value;
    }
  };

  return data.filter(func);
};


export const removeById = (idField , value , data) => {

  idField = idField.toLowerCase();

  const func = (obj) => {

    return  obj[idField] !== value;
  
  };

  return data.filter(func);
};

export const  makeListByField = (data, field) => {
  return data.map(item => item[field])
}

export const intersect = (fieldOne , listOne, listTwo) => {

  fieldOne = fieldOne.toLowerCase();

  return  listOne.filter(value => listTwo.includes(value[fieldOne]));

}

export const removeField = (data, field) => {
    
  data.forEach(object => {
    delete object[field];
  });

  return data;

}

export const fieldContains = (field, value, data) => {

  if(!hasKey(data, field)) console.log('No key matches on the data');

  if(value === '%') return data;

  field = field.toLowerCase();
  value = value.toLowerCase();

  const func = (obj) => {
    return  obj[field].toString().toLowerCase().indexOf(value) >= 0 ;
  };

  return data.filter(func);
}

export const fieldStartsWith = (field, value, data) => {

  if(!hasKey(data, field)) console.log('No key matches on the data');

  if(value === '%') return data;

  field = field.toLowerCase();
  value = value.toLowerCase();
  
  const func = (obj) => {
    return  obj[field].toString().toLowerCase().startsWith(value);
  };

  return data.filter(func);
}


export const sortByField  = (data, field, desc = false) => {

  if(!hasKey(data, field)) console.log('No key matches on the data');

  const sortRulesAsc = (a, b) => {
    return (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0);
  }

  const sortRulesDesc = (a, b) => {
    return (a[field] > b[field]) ? -1 : ((b[field] > a[field]) ? 1 : 0);
  }

  data = desc ? data.sort(sortRulesDesc) : data.sort(sortRulesAsc);

  return data;
};

// Return the number of decimal places and integer places on a given number
export const countLength = (value) => {
  const strValue = value.toString();
  const len = strValue.length;
  // separetor Position
  let sepPos;



  if(strValue.indexOf(',') > 0){
    sepPos = strValue.indexOf(',');
  }else if(strValue.indexOf('.') > 0){
    sepPos = strValue.indexOf('.');
  }else{
    return [strValue.length, 0];
  }

  const decimalPart = len - sepPos -1;
  const integerPart = sepPos;

  return [integerPart, decimalPart];
}

export const getGreatest = (data, field) => {

  if(data.length === 0 || data === 'undefined') return 0;

  return sortByField(data, field, true)[0];
   
}

export const removeDuplicate = (array) => {
  const newList = array.filter(function(x, i) {
    return array.indexOf(x) === i;
  });

  return newList;
} 