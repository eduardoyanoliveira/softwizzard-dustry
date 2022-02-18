import React from 'react';
import ProductionWithdrawalsRegisterPage from './productionWithdrawalsRegisterPage';
import { ProductProvider } from '../../../contexts/ProductProvider';
import { ProductionOrderProvider } from '../../../contexts/ProductionOrderProvider';
import { MachineProvider }  from '../../../contexts/MachineProvider';
import { POProductProvider } from '../../../contexts/POProductProvider';
import { POWithdrawProvider } from '../../../contexts/POWithdrawProvider'
import { POOperatorProvider } from '../../../contexts/POOperatorProvider'

function ProductionWithdrawalsRegister() {
    return (
        <ProductionOrderProvider>
            <POOperatorProvider>
                <MachineProvider>
                    <POProductProvider>
                        <ProductProvider>
                            <POWithdrawProvider>
                                <ProductionWithdrawalsRegisterPage/>
                            </POWithdrawProvider>
                        </ProductProvider>
                    </POProductProvider>                                  
                </MachineProvider>
            </POOperatorProvider>
        </ProductionOrderProvider> 
    )
}

export default ProductionWithdrawalsRegister;

