import React from 'react';
import RawMaterialRegisterPage from './rawMaterialRegisterPage';
import { RawMaterialProvider } from '../../../contexts/RawMaterialProvider' ;

const formInputs = [
    {
        name: 'active',
        value: true
    },
    {
        id: 0,
        name: 'name',
        desc: 'Descrição',
        type: 'text',
        value: "''"
    },
    {
        id: 1,
        name: 'cost',
        desc: 'Custo por Kilo',
        type: 'number',
        value: "''"
    },
];


function RawMaterialRegister() {
    return (
        <RawMaterialProvider>
            <RawMaterialRegisterPage formInputs={formInputs}/>
        </RawMaterialProvider>
    )
}

export default RawMaterialRegister;
