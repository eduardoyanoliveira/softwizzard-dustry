import React from 'react';
import BreakReasonRegisterPage from './breakReasonRegisterPage';
import { BreakReasonProvider } from '../../../contexts/BreakReasonProvider';

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
];

function BreakReasonRegister() {
    return (
        <BreakReasonProvider>
            <BreakReasonRegisterPage formInputs={formInputs}/>
        </BreakReasonProvider>
    )
}

export default BreakReasonRegister;
