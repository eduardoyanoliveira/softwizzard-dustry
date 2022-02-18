import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductContext } from '../../../contexts/ProductProvider/context';

import { MachineContext } from '../../../contexts/MachineProvider/context';
import { ProductionOrderContext } from '../../../contexts/ProductionOrderProvider/context';
import { POProductContext } from '../../../contexts/POProductProvider/context';
import { POWithdrawContext } from '../../../contexts/POWithdrawProvider/context';
import { POOperatorContext } from '../../../contexts/POOperatorProvider/context';

import SearchTableComponent from '../../../components/SearchTable';
import MainFormContainer from '../../../components/MainFormContainer';
import GenericButton from '../../../components/Button';
import Field from '../../../components/Field';
import TableList from '../../../components/TableList';
import FixedContainerComponent from '../../../components/FixedContainer';
import SnackBarComponent from '../../../components/SnackBar';

import { reloadScreen, formatDate } from '../../../Utils/formMethods';
import { findsByField, intersect, makeListByField, tableToJson } from '../../../Utils/gridMethods';

import { listProductionOrder } from '../../../contexts/ProductionOrderProvider/actions';
import { listPOProducts, getPOProduct } from '../../../contexts/POProductProvider/actions';
import { listProduct } from '../../../contexts/ProductProvider/actions';
import { getByOperator } from '../../../contexts/POOperatorProvider/actions';
import { listPOWithdraw, createPOWithdraw  } from '../../../contexts/POWithdrawProvider/actions';
import { listMachine } from '../../../contexts/MachineProvider/actions';
import { Container } from '../styles';


// The structure of the columns on the searchTable component
const searchTableCols = [
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
const columns = [
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

const tableId = 'table';

function ProductionWithdrawalsRegisterPage() {
    const navigate = useNavigate();
    // If the user selects a register to modify , it will be load to this state
    const [selected, setSelected] = useState(null);
    const [searchData, setSearchData] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);

    // Turns the compositonList in a list that matches the "columns" declaration
    const [ decodedList, setDecodedList] = useState([]);

    const [allowedProducts, setAllowedproducts] = useState([]); 

    const isMounted = useRef(true);

    const productContext = useContext(ProductContext);
    const machineContext = useContext(MachineContext);
    const pOProductContext = useContext(POProductContext);
    const pOWithdrawContext = useContext(POWithdrawContext);
    const productionOrderContext = useContext(ProductionOrderContext);
    const pOOperatorContext = useContext(POOperatorContext);

    const loadData = useCallback(() => {

        // Load the data from the Api

        listProductionOrder(productionOrderContext.dispatch).then((dispatch) =>{
            if(isMounted.current){
                dispatch();
            };
        }).catch((error) => {
            if(error.response.status === 401){
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                navigate('/');
                reloadScreen(10);
            }
        });

        if(JSON.parse(localStorage.getItem('is_operator'))) getByOperator(pOOperatorContext.dispatch, JSON.parse(localStorage.getItem('operator_id')));

        listPOProducts(pOProductContext.dispatch).then((dispatch) =>{
            if(isMounted.current){
                dispatch();
            };
        });

        listProduct(productContext.dispatch).then((dispatch) =>{
            if(isMounted.current){
                dispatch();
            };
        });

        listMachine(machineContext.dispatch).then((dispatch) =>{
            if(isMounted.current){
                dispatch();
            };
        });

        return () => {
            isMounted.current = false;
        }
    },[
        productionOrderContext.dispatch,
        pOProductContext.dispatch,
        productContext.dispatch,
        machineContext.dispatch,
        pOOperatorContext.dispatch,
        navigate
    ]);

    // Get all data to the search table
    useEffect(() => {
        setSearchData([]);
        if((machineContext.state.list.length > 0  && productionOrderContext.state.list.length > 0 )){
            // If the user is operator, allow only the produciton orders that is bonded with him
            let orders;
            if(JSON.parse(localStorage.getItem('is_operator'))){
                orders = intersect('id', productionOrderContext.state.list, makeListByField(pOOperatorContext.state.list, 'order_id'));
            }else{
                orders = productionOrderContext.state.list;
            }
            for(let i in orders){
                let machine = findsByField('id', productionOrderContext.state.list[i].machine_id, machineContext.state.list)[0].name;
                setSearchData((prev) => [
                    ...prev,
                    {
                        id: orders[i].id,
                        machine: machine,
                        leader_id: orders[i].leader_id,
                        start: formatDate(new Date(orders[i].start)),
                    }
            
                ]);
            }
        }
    },[productionOrderContext.state.list, machineContext.state.list, pOOperatorContext.state.list]);

    // Load the data when the component is mounted
    useEffect(() => {
        loadData();
    },[loadData]);

    // On click shows the search table
    const handleSearchDisplay = () => {
        setSearchOpen(true);
    };

    // Function to handle click on exit button in the searchTable 
    const handleExit = () => {
        setSearchOpen(false);
    }
    
    
    // Cleans the screen varibles
    const cleanVaribles = () => {
        setAllowedproducts([]);
        setDecodedList([]);
    }

    // Capture "AUTOCOMPLET" chosen object and update the values of all inputs ,
    const captureProduction = (value) => {
        // Cleans all varibles to avoid a conflict 
        cleanVaribles();
        const order = findsByField('id', value[0].id, productionOrderContext.state.list)[0];
        setSelected(order);
        setSearchOpen(false);

        listPOWithdraw(pOWithdrawContext.dispatch, order.id);
        getPOProduct(pOProductContext.dispatch, order.id);
    }

    // for each register already present on withdrawals, it decodes the register and save on the decode state
    // This action have to be executed in order to the withdrawals tableList be able to render the current registers
    useEffect(() => {
        const currentWithdrawals = [ ...pOWithdrawContext.state.list];
        for(let i in currentWithdrawals){
            setDecodedList((prev) => (
                [...prev, 
                    {
                        id: Number(i) + 1,
                        product_id: currentWithdrawals[i]['product_id'], 
                        name: [...findsByField('id', currentWithdrawals[i]['product_id'], productContext.state.list)][0]['name'],
                        quantity: currentWithdrawals[i]['qty'],
                    }
                ]
            ))
        }

    },[pOWithdrawContext.state.list, productContext.state.list]);

    // When a order is selected , filters only the products established to this order to be chosen
    useEffect(() => {
        setAllowedproducts([]);
        for(let i in pOProductContext.state.list){
            setAllowedproducts((prev) => [
                ...prev,
                ...findsByField('id', pOProductContext.state.list[i].product_id, productContext.state.list)
            ])
        }

    },[pOProductContext.state.list, productContext.state.list]);

    // Save the data on the api
    const handleClick = () => {

        if(!selected) return;
        
        const tableData = document.getElementById(tableId) && tableToJson(document.getElementById(tableId), columns);
        const withdrawals = [];
        for(let i in tableData){
            if(tableData[i].id > pOWithdrawContext.state.list.length ){
                withdrawals.push(  
                    {
                        id: tableData[i].product_id,
                        quantity: tableData[i].quantity
                    }
                );
            }  
        }

        const createWithdraw = (dispatch, orderId, withdrawalsList) => {
            for(let i in withdrawalsList){
                createPOWithdraw(dispatch, orderId, withdrawalsList[i]['id'], withdrawalsList[i]['quantity']);
            };
        }

        // If one register has been selected, update its values otherwise create a new 
        createWithdraw(pOWithdrawContext.dispatch, selected.id, withdrawals);  

        // Wait a while for the user to see the feedback message, then clear the screen
        reloadScreen();
    };

    return (
        <MainFormContainer
            title={'Tiragens'}
            loading={productionOrderContext.state.loading}
            handleClick={handleSearchDisplay}
            isRestrict={false}
        >
        {
            //After an event on this page , shows the feedback message
            pOWithdrawContext.state.feedback && (
                <Container style={{marginTop: '7px'}}>
                    <SnackBarComponent 
                        title={pOWithdrawContext.state.feedback}
                        type={pOWithdrawContext.state.error ? 'FAIL' : 'SUCCESS'}
                    />  
                </Container>
            ) 
        }
        <Field
            title={'Código Ordem'}
            value={selected && selected.id}
            margin={'0 0 15px 0'} 
        />
        {
            selected ? (
                <TableList
                    title={'Tiragens'}
                    columns={columns} 
                    data={decodedList} 
                    tableId={tableId}
                    unique={false}
                    field={'product_id'}
                    searchData={allowedProducts}
                    margin={'0 0 15px 0'}
                />
            )
            :
            (
                <div style={{height: '300px', width: '20px'}}>

                </div>
            )
        }
        <Container style={{marginTop: '7px'}}>
            <GenericButton  
                text='Gravar' 
                handleClick={handleClick} 
                background={'success'}
            />
        </Container>
            {
                searchOpen && (
                    <FixedContainerComponent>
                        <SearchTableComponent 
                            title={'Ordens de Produção'} 
                            data={searchData}
                            columns={searchTableCols}
                            tableId={'search-table'}
                            handleClick={captureProduction}
                            handleExit={handleExit}
                        />
                    </FixedContainerComponent>
                )
            }
        </MainFormContainer>
    )
}

export default ProductionWithdrawalsRegisterPage;
