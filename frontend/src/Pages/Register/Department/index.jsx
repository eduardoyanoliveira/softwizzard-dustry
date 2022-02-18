import React from 'react';
import DepartmentRegisterPage from './departmentRegisterPage';
import { DepartmentProvider } from '../../../contexts/DepartmentsProvider'; 

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


function DepartmentRegister() {
    return (
        <DepartmentProvider>
            <DepartmentRegisterPage formInputs={formInputs}/>
        </DepartmentProvider>
    )
}

export default DepartmentRegister;
