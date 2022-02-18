import React from 'react';
import OperatorRegisterPage from './operatorRegisterPage';
import { OperatorProvider } from '../../../contexts/OperatorProvider';
import { SectorProvider } from '../../../contexts/SectorProvider';
import { OperatorSectorProvider } from '../../../contexts/OperatorSectorProvider';

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
        name: 'salary',
        desc: 'Sálario',
        type: 'number',
        value: "''"
    },
];

function OperatorRegister() {
    return (
        <OperatorProvider>
            <SectorProvider>
                <OperatorSectorProvider>
                    <OperatorRegisterPage formInputs={formInputs}/>
                </OperatorSectorProvider>
            </SectorProvider>
        </OperatorProvider>
    )
}

export default OperatorRegister;
