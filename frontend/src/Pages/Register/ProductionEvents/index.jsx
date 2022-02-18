import React from 'react';
import ProductionEventRegisterPage from '../ProductionEvents/productionEventRegisterPage';
import { BreakReasonProvider } from '../../../contexts/BreakReasonProvider';
import { BreakSolutionProvider } from '../../../contexts/BreakSolutionProvider';
import { ProductionOrderProvider } from '../../../contexts/ProductionOrderProvider';
import { MachineProvider }  from '../../../contexts/MachineProvider';
import { MechanicProvider } from '../../../contexts/MechanicProvider';
import { POEventProvider } from '../../../contexts/POEventProvider';
import { POOperatorProvider } from '../../../contexts/POOperatorProvider';


function ProductionEventsRegister() {
    return (
        <ProductionOrderProvider>
            <POOperatorProvider>
                <MachineProvider>
                    <BreakReasonProvider>
                        <BreakSolutionProvider>
                            <MechanicProvider>
                                <POEventProvider>
                                    <ProductionEventRegisterPage/>
                                </POEventProvider>
                            </MechanicProvider>
                        </BreakSolutionProvider>
                    </BreakReasonProvider>                                  
                </MachineProvider>
            </POOperatorProvider>
        </ProductionOrderProvider> 
    )
}

export default ProductionEventsRegister;
