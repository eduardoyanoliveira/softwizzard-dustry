import React from 'react';
import ProductionOrderRegisterPage from './productionOrderRegisterPage'
import { ProductionOrderProvider } from '../../../contexts/ProductionOrderProvider'; 
import { MachineProvider } from '../../../contexts/MachineProvider';
import { MachineProductProvider } from '../../../contexts/MachineProductProvider';
import { LeaderProvider } from '../../../contexts/LeaderProvider';
import { OperatorProvider } from '../../../contexts/OperatorProvider';
import { ProductProvider } from '../../../contexts/ProductProvider';
import { POOperatorProvider } from '../../../contexts/POOperatorProvider';
import { POProductProvider } from '../../../contexts/POProductProvider';
import { POEventProvider } from '../../../contexts/POEventProvider';
import { POWithdrawProvider } from '../../../contexts/POWithdrawProvider';

const columns = [
    {
      id: 0,
      name: 'id',
      desc: 'ID',
      width: 30,
      options: {
        identifier: true,
        order: false,
      }
    },
    {
      id: 1,
      name: 'machine',
      desc: 'Máquina',
      width: 70,
      options: {
        order: false,
      }
    },
    {
      id: 2,
      name: 'leader_id',
      desc: 'Cód.Líder',
      width: 120,
      options: {
        order: false,
      }
    },
    {
      id: 3,
      name: 'start',
      desc: 'Data Cadastro',
      width: 150,
      options: {
        order: false,
      }
    }
];

// The structure of the columns on the  tableList component
const withdrawCols = [
    {
        id: 0,
        name: 'id',
        desc: 'ID',
        width: 30,
        options: {
            order: false,
        },
    },
    {
        id: 1,
        name: 'product_id',
        desc: 'Cód.Produto',
        width: 70,
        options: {
            order: false,
        },
        identifier: true
    },
    {
        id: 2,
        name: 'name',
        desc: 'Produto',
        width: 120,
        options: {
            order: false,
        },
    },
    {
        id: 3,
        name: 'quantity',
        desc: 'Quantidade',
        width: 100,
        options: {
            order: false,
        },
    }
];


function ProductionOrderRegister() {
    return (
        <ProductionOrderProvider>
            <MachineProvider>
                <MachineProductProvider>
                    <LeaderProvider>
                        <OperatorProvider>
                            <POOperatorProvider>
                                <ProductProvider>
                                    <POProductProvider>
                                        <POEventProvider>
                                            <POWithdrawProvider>
                                                <ProductionOrderRegisterPage searchCols={columns} withdrawCols={withdrawCols}/>
                                            </POWithdrawProvider>
                                        </POEventProvider>
                                    </POProductProvider>                                                     
                                </ProductProvider>
                            </POOperatorProvider> 
                        </OperatorProvider>
                    </LeaderProvider>            
                </MachineProductProvider>             
            </MachineProvider>              
        </ProductionOrderProvider>
    )
}

export default ProductionOrderRegister;
