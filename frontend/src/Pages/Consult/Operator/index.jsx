import React from 'react';
import ProductionOrderConsultPage from './productionOrderConsultPage';
import { MachineProvider } from '../../../contexts/MachineProvider';
import { OperatorProvider } from '../../../contexts/OperatorProvider';
import { ProductionOrderProvider } from '../../../contexts/ProductionOrderProvider';

function ConsultOperator() {

    return (
        <MachineProvider>
            <OperatorProvider>
                <ProductionOrderProvider>
                    <ProductionOrderConsultPage/>
                </ProductionOrderProvider>
            </OperatorProvider>
        </MachineProvider>
    )
}

export default ConsultOperator;
