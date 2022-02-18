import React from 'react';
import MechanicRegisterPage from './mechanicRegisterPage';
import { MechanicProvider } from '../../../contexts/MechanicProvider';

const formInputs = [
    {
        name: 'active',
        value: true
    },
    {
        id: 0,
        name: 'name',
        desc: 'Nome',
        type: 'text',
        value: "''"
    },
    {
        id: 1,
        name: 'value_per_hour',
        desc: 'Valor Hora',
        type: 'number',
        value: "''"
    },
    {
        name: 'outsourced',
        value: false
    },
];


function MechanicRegister() {
    return (
        <MechanicProvider>
            <MechanicRegisterPage formInputs={formInputs}/>
        </MechanicProvider>
    )
}

export default MechanicRegister;
