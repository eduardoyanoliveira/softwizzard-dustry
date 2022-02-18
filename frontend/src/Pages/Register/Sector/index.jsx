import React from 'react';
import SectorRegisterPage from './sectorRegisterPage';
import { SectorProvider } from '../../../contexts/SectorProvider';

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


function SectorRegister() {
    return (
        <SectorProvider>
            <SectorRegisterPage formInputs={formInputs}/>
        </SectorProvider>
    )
}

export default SectorRegister;
