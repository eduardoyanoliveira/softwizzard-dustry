import React from 'react';
import MachineRegisterPage from './machineRegisterPage';
import { MachineProvider } from '../../../contexts/MachineProvider';
import { ProductProvider } from '../../../contexts/ProductProvider';
import { MachineProductProvider } from '../../../contexts/MachineProductProvider';

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
        name: 'kw_per_hour',
        desc: 'Kw por Hora',
        type: 'number',
        value: "''"
    },
    {
        id: 2,
        name: 'length',
        desc: 'Tamanho',
        type: 'number',
        value: "''"
    },
];


function MachineRegister() {
    return (
        <MachineProvider>
            <ProductProvider>
                <MachineProductProvider>
                    <MachineRegisterPage formInputs={formInputs}/>
                </MachineProductProvider>
            </ProductProvider>
        </MachineProvider>
    )
}

export default MachineRegister;
