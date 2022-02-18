import { countLength } from './gridMethods';


const validNumber = (number) => {

    if(!number|| number.length === 0){
        return '* Campo Obrigatório';
    }

    const [integerLen, decimalLen] = countLength(number);

    if(integerLen > 6){
        return '* O número máximo de casas não decimais é 6';
    };

    if(decimalLen > 2){
        return  '* O número máximo de  casas decimais é 2';
    };
}

const validText = (text) => {

    if(!text || text.length === 0){
        return '* Campo Obrigatório';
    }

    if(text.length <=2){
        return '* Campo de texto precisa ter no mínimo 3 caracteres';
    }
}

const validPassword = (password) => {

    if(!password || password.length === 0){
        return '* Campo Obrigatório';
    }

    if(password.length <=7){
        return '* Campo de Senha precisa ter no mínimo 8 caracteres';
    }
}

const validNotNullSelector = (array) => {
    if(!array || array.length === 0){
        return '* Selecione ao menos uma opção para este campo';
    }
}

const required = (field) => {

    if(!field || field.length === 0 || Object.keys(field).length === 0){
        return '* Campo Obrigatório';
    }
}

export const validField = (field, type) => {

    let msg = '';

    switch(type){
        case 'text':{
            msg = validText(field);
            break;
        }
        case 'number':{
            msg = validNumber(field);
            break;
        }
        case 'selector':{
            msg = validNotNullSelector(field);
            break;
        }
        case 'required':{
            msg = required(field);
            break;
        }
        case 'password':{
            msg = validPassword(field);
            break;
        }
        default:{
            msg = 'error';
            break;
        }
    }

    return msg;
}