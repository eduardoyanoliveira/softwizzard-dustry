import React from 'react';
import ProductRegisterPage from './productRegisterPage';
import { ProductProvider } from '../../../contexts/ProductProvider';
import { RawMaterialProvider } from '../../../contexts/RawMaterialProvider';
import { DepartmentProvider } from '../../../contexts/DepartmentsProvider';
import { ProductCompositionProvider } from '../../../contexts/ProductCompositionProvider';

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
        name: 'weight',
        desc: 'Peso Unitário',
        type: 'number',
        value: "''"
    },
];

function ProductRegister() {
    return (
        <ProductProvider>
            <RawMaterialProvider>
                <DepartmentProvider>
                  <ProductCompositionProvider>
                      <ProductRegisterPage formInputs={formInputs}/>
                 </ProductCompositionProvider>
                </DepartmentProvider>
            </RawMaterialProvider>
        </ProductProvider>
    )
}

export default ProductRegister;
