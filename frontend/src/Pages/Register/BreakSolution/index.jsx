import React from 'react';
import BreakSolutionRegisterPage from './breakSolutionRegisterPage';
import { BreakSolutionProvider } from '../../../contexts/BreakSolutionProvider';

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


function BreakSolutionRegister() {
    return (
        <BreakSolutionProvider>
            <BreakSolutionRegisterPage formInputs={formInputs}/>
        </BreakSolutionProvider>
    )
}

export default BreakSolutionRegister;
