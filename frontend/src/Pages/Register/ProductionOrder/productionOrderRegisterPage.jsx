import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { DimensionsContext } from '../../../contexts/Dimensions/context';

import { ProductionOrderContext } from '../../../contexts/ProductionOrderProvider/context';
import * as types from '../../../contexts/ProductionOrderProvider/types';

import { MachineContext } from '../../../contexts/MachineProvider/context';
import { MachineProductContext } from '../../../contexts/MachineProductProvider/context';
import { LeaderContext } from '../../../contexts/LeaderProvider/context';
import { OperatorContext } from '../../../contexts/OperatorProvider/context';
import { ProductContext } from '../../../contexts/ProductProvider/context';
import { POOperatorContext } from '../../../contexts/POOperatorProvider/context';
import { POProductContext } from '../../../contexts/POProductProvider/context';
import { POEventContext } from '../../../contexts/POEventProvider/context';
import { POWithdrawContext } from '../../../contexts/POWithdrawProvider/context';

import Header from '../../../components/FormHeader';
import InputPro from '../../../components/InputPro';
import TextInput from '../../../components/TextInput';
import SearchInput from '../../../components/SearchInput';
import Field from '../../../components/Field';
import ListOptions from '../../../components/ListOptions';
import GenericButton from '../../../components/Button';
import MessageComponent from '../../../components/Message';
import SearchTableComponent from '../../../components/SearchTable';
import FixedContainerComponent from '../../../components/FixedContainer';
import TableList from '../../../components/TableList';
import SnackBarComponent from '../../../components/SnackBar';

import { validField } from '../../../Utils/inputValidations';
import { reloadScreen} from '../../../Utils/formMethods';
import { findsByField, removeById, findsNull } from '../../../Utils/gridMethods';

import { listProductionOrder, createProductionOrder,  updateProductionOrder } from '../../../contexts/ProductionOrderProvider/actions';
import { listMachineActive } from '../../../contexts/MachineProvider/actions';
import { getMachineProduct } from '../../../contexts/MachineProductProvider/actions';
import { listLeaderActive } from '../../../contexts/LeaderProvider/actions';
import { listOperatorActive } from '../../../contexts/OperatorProvider/actions';
import { createPOOperator, deletePOOperator, listPOOperators } from '../../../contexts/POOperatorProvider/actions';
import { listProductActive } from '../../../contexts/ProductProvider/actions';
import { listPOEvent } from '../../../contexts/POEventProvider/actions';
import { createPOProduct, getPOProduct, deletePOProduct } from '../../../contexts/POProductProvider/actions';
import { getUrlParams } from '../../../Utils/urlMethods';
import { listPOWithdraw, createPOWithdraw } from '../../../contexts/POWithdrawProvider/actions';

import { getSearchDataProduction } from '../../../Utils/ProductionForms/getSearchDataProduction';
import { getCurrentProducts } from '../../../Utils/ProductionForms/getCurrentProducts';
import { withdrawalsToTable } from '../../../Utils/ProductionForms/withdrawalsToTable';
import { loadOperators } from '../../../Utils/ProductionForms/loadOperators';
import { getWithdrawals } from '../../../Utils/ProductionForms/getWithdrawals';
import { ButtonContainer, Container, FormContainer, FormHeader, HeaderRow, MainContainer, SelectTableContainer, Wrapper } from './styles';

const tableId = 'withdrawals-table';

function ProductionOrderRegisterPage({searchCols, withdrawCols}) {
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);

    const [selected, setSelected] = useState(null);
    const [message, setMessage] = useState({
        msg: '',
        type: '',
    });

    const disabled = (JSON.parse(localStorage.getItem('is_operator')) && selected) || (selected && selected.end);
  
    const [formData, setFormData] = useState({
        id: 0,
        machine: {},
        leader: {},
        shift: '',
        initial_hour_meter : '',
        end_hour_meter: '',
        obs: '',
    });

    const [ decodedList, setDecodedList] = useState([]);

    const [operators, setOperators] = useState([]);

    const [allowedProducts, setAllowedProducts] = useState([]);
    const [products, setProducts] = useState([]);


    const [inputHelper, setInputHelper] = useState({
        machine : {
            msg: ''
        },
        leader : {
            msg: ''
        },
        shift : {
            msg: ''
        },
        initial_hour_meter: {
            msg: ''
        },
        end_hour_meter: {
            msg: ''
        },
        operators: {
            msg: ''
        },
        products: {
            msg: ''
        },
    });

    const isMounted = useRef(true);

    const dimensions = useContext(DimensionsContext);

    const isSmall = dimensions === 'SMALL';
    const isMobile = (dimensions === 'SMALL' || dimensions === 'MOBILE');
    const isTablet = dimensions === 'TABLET';

    const productionOrderContext = useContext(ProductionOrderContext);
    const machineContext = useContext(MachineContext);
    const machineProductContext = useContext(MachineProductContext);
    const leaderContext = useContext(LeaderContext);
    const operatorContext = useContext(OperatorContext);
    const pOOperatorContext = useContext(POOperatorContext);
    const productContext = useContext(ProductContext);
    const pOProductContext = useContext(POProductContext);
    const pOEventContext = useContext(POEventContext);
    const pOWithdrawContext = useContext(POWithdrawContext);

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

        listPOOperators(pOOperatorContext.dispatch).then((dispatch) =>{
            if(isMounted.current){
                dispatch();
            };
        });

        listMachineActive(machineContext.dispatch).then((dispatch) =>{
            if(isMounted.current){
                dispatch();
            };
        });

        listLeaderActive(leaderContext.dispatch).then((dispatch) =>{
            if(isMounted.current){
                dispatch();
            };
        });

        listOperatorActive(operatorContext.dispatch).then((dispatch) =>{
            if(isMounted.current){
                dispatch();
            };
        });

        listProductActive(productContext.dispatch).then((dispatch) =>{
            if(isMounted.current){
                dispatch();
            };
        });

        return () => {
            isMounted.current = false;
        }
    },[
        productionOrderContext.dispatch,
        machineContext.dispatch,
        leaderContext.dispatch,
        operatorContext.dispatch,
        productContext.dispatch,
        pOOperatorContext.dispatch,
        navigate
    ]);

    // Load the data when the component is mounted
    useEffect(() => {
        loadData();
    },[loadData]);

    // Get all data to the search table
    const getSearchData = useCallback(() => {
        setSearchData([]);
        setSearchData(
            getSearchDataProduction(machineContext.state.list, pOOperatorContext.state.list, productionOrderContext.state.list)
        );
    },[machineContext.state.list, pOOperatorContext.state.list, productionOrderContext.state.list]);

    // On click shows the search table
    const handleSearchDisplay = () => {
        getSearchData();
        setSearchOpen(true);
    };

    // Function to handle click on exit button in the searchTable 
    const handleExit = () => {
        setSearchOpen(false);
    }
    
    // Capture "AUTOCOMPLET" chosen object and update the values of all inputs ,
    const captureValue = useCallback((value) => {
        const order = findsByField('id', Number(value[0].id), productionOrderContext.state.list)[0];
        //If the order on screen is equal to the new selection, does nothing
        if(selected && selected.id === order.id){
            setSearchOpen(false);
        }  
        else{
            setSearchOpen(false);
            setOperators([]);
            setDecodedList([]);
            setProducts([]);
            setAllowedProducts([]);
            setSelected(order);
        }
    },[productionOrderContext.state.list, selected]);

    useEffect(() => {
        if(getUrlParams()){
            captureValue([getUrlParams()]);
        } 
    },[captureValue]);

    // Load the fields whenever a register is selected
    useEffect(() => {
        if(selected){
            setFormData({
                id: selected.id,
                leader: findsByField('id', selected.leader_id, leaderContext.state.list)[0],
                machine: findsByField('id', selected.machine_id, machineContext.state.list)[0],
                shift: selected.shift,
                initial_hour_meter: selected.initial_hour_meter,
                end_hour_meter: selected.end_hour_meter,
                obs: selected.obs
            });
        }
    },[selected, leaderContext.state.list, machineContext.state.list ]);

    
    // List the established events on the order 
    useEffect(() => {
        if(selected) listPOEvent(pOEventContext.dispatch, selected.id);
    },[selected, pOEventContext.dispatch])



    // Loads the products estabished to the order, according with the selected order
    useEffect(() => {
        if(selected) getPOProduct(pOProductContext.dispatch, selected.id);
    },[selected, pOProductContext.dispatch]);

    // Display the established products on screen
    useEffect(() => {
        setProducts([]);
        setProducts(getCurrentProducts(productContext.state.list,pOProductContext.state.list));
    },[pOProductContext.state.list, productContext.state.list]);

    // Capture whenever a item is add to the Products' list on the list component and add to this component list
    const handleProductListAdd = useCallback((value) => {
        setProducts((s) => [...s, value]);
    },[]);

    const handleProductListDel  = (pk) => {
        setProducts((s) => [...removeById('id', pk , s)]);
    }


    // Loads  only the products estabished to the machine, according with the selected order
    useEffect(() => {
        if(selected) getMachineProduct(machineProductContext.dispatch, selected.machine_id);
    },[selected, machineProductContext.dispatch]);

    // Capture the chosen machine on the AUTOCOMPLENTE Machine
    const captureMachine = useCallback((value) => {
        getMachineProduct(machineProductContext.dispatch, value.id);
        
        setFormData({
            ...formData,
            machine: value
        });
    },[formData, machineProductContext.dispatch]);


    const handleMachineChange = () => {
        // if the name is changed, the selected value will be cleaned 
        setAllowedProducts([]);
        setFormData({
            ...formData,
            machine: {}
        });
    };
        

    // When a machine is selected , filters only the products established to this machine to be chosen
    useEffect(() => {
        setAllowedProducts([]);
        for(let i in machineProductContext.state.list){
            setAllowedProducts((prev) => [
                ...prev,
                ...findsByField('id', machineProductContext.state.list[i].product_id, productContext.state.list)
            ])
        }

    },[machineProductContext.state.list, productContext.state.list]);


    //Loads the already established withdrawals in the order
    useEffect(() => {
        if(selected){
            listPOWithdraw(pOWithdrawContext.dispatch, selected.id);
        }
    },[selected, pOWithdrawContext.dispatch])

    // for each register already present on withdrawals, it decodes the register and save on the decode state
    useEffect(() => {
        setDecodedList(withdrawalsToTable(pOWithdrawContext.state.list, productContext.state.list));
    },[pOWithdrawContext.state.list, productContext.state.list]);


    // Loads the operators estabished to the order, according with the selected order
    useEffect(() => {
        if(selected){
            setOperators(
                loadOperators(findsByField('order_id', selected.id, pOOperatorContext.state.list), operatorContext.state.list)
            );
        }
    },[selected, pOOperatorContext.state.list, operatorContext.state.list])

    // Capture whenever a item is add to the Operators' lsit on the list component and add to this component list
    const handleOperatorListAdd = useCallback((value) => {
        setOperators((s) => [...s, value]);
    },[]);

    const handleOperatorListDel  = useCallback((pk) => {
        setOperators((s) => [...removeById('id', pk , s)]);
    },[]);

    // Capture the chosen Leader on the AUTOCOMPLENTE Leader
    const captureLeader = useCallback((value) => {
        setFormData({
            ...formData,
            leader: value
        });
    },[formData]);


    const handleLeaderChange = () => {
        // if the name is changed, the selected value will be cleaned 
        setFormData({
            ...formData,
            leader: {}
        });
    };


    // Capture the chosen Shift on the AUTOCOMPLENTE Shift
    const captureShift = useCallback((value) => {
        setFormData({
            ...formData,
            shift: value.name
        });
    },[formData]);


    const handleShiftChange = () => {
        // if the name is changed, the selected value will be cleaned 
        setFormData({
            ...formData,
            shift: ''
        });
    }


    const handleChange = (e) => {   
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Save the data on the api
    const handleClick = () => {

        const machineMsg = validField(formData.machine, 'required');

        setInputHelper((prev) => ({
            ...prev,
            machine : {
                msg: machineMsg
            }
        }));

        const leaderMsg = validField(formData.leader, 'required');

        setInputHelper((prev) => ({
            ...prev,
            leader : {
                msg: leaderMsg
            }
        }));

        const shiftMsg = validField(formData.shift, 'required');

        setInputHelper((prev) => ({
            ...prev,
            shift : {
                msg: shiftMsg
            }
        }));

        const initial_hour_meterMsg = validField(formData.initial_hour_meter, 'required');

        setInputHelper((prev) => ({
            ...prev,
            initial_hour_meter : {
                msg: initial_hour_meterMsg
            }
        }));

        const operatorsMsg = validField(operators, 'selector');

        setInputHelper((prev) => ({
            ...prev,
            operators : {
                msg: operatorsMsg
            }
        }));

        const productsMsg = validField(products, 'selector');

        setInputHelper((prev) => ({
            ...prev,
            products : {
                msg: productsMsg
            }
        }));

        if( 
            machineMsg 
            || 
            leaderMsg 
            || 
            shiftMsg 
            || 
            initial_hour_meterMsg 
            || 
            operatorsMsg
            ||
            productsMsg
        ) return;

        const withdrawals = selected ? getWithdrawals(tableId, withdrawCols, pOWithdrawContext.state.list) : [];

        const createWithdraw = (orderId, withdrawalsList) => {
            for(let i in withdrawalsList){
                createPOWithdraw(pOWithdrawContext.dispatch, orderId, withdrawalsList[i]['id'], withdrawalsList[i]['quantity']);
            };
        }

        // Data to create or updata a register
        const data = {
            machine_id: formData.machine.id,
            leader_id: formData.leader.id,
            shift: formData.shift,
            initial_hour_meter: formData.initial_hour_meter,
            end_hour_meter: formData.end_hour_meter,
            obs: formData.obs
        };

        const createOperators = (orderId, operatorList) => {
            for(let i in operatorList){
                createPOOperator(pOOperatorContext.dispatch, orderId, operatorList[i]['id']);
            };
        }

        const createProducts = (orderId, productList) => {
            for(let i in productList){
                createPOProduct(pOProductContext.dispatch, orderId, productList[i]['id']);
            };
        }

        const create = () => {

            createProductionOrder(data)
            .then((response) => {
                productionOrderContext.dispatch({ 
                    type: types.CREATE_SUCCESS,
                    payload: `"${response.data.name}" cadastrado com sucesso!`
                });
                createOperators(response.data['id'], operators);
                createProducts(response.data['id'], products);
                setMessage({
                    msg: `Ordem de Produção número ${response.data.id}, cadastrada com sucesso!`,
                    type: 'SAVE'
                })
            })
            .catch((error) => {
                productionOrderContext.dispatch({
                    type: types.CREATE_FAIL,
                    payload: 'Ocorreu um erro no cadastro'
                });
            });   
        } 

        const update = () => {

            updateProductionOrder(productionOrderContext.dispatch, data, selected['id']); 

            // Drops all established operators in the PO , before reset them.
            deletePOOperator(selected['id'], true).then((response) => {
                createOperators(selected['id'], operators);
            })
            .catch((error) => {
                createOperators(selected['id'], operators);
            });  

            // Drops all established products in the PO , before reset them.
            deletePOProduct(selected['id'], true).then((response) => {
                createProducts(selected['id'], products);
            })
            .catch((error) => {
                createProducts(selected['id'], products);
            });  

            // If one register has been selected, update its values otherwise create a new 
            createWithdraw(selected.id, withdrawals); 
        }

        // If one register has been selected, update its values otherwise create a new register
        if(selected){
            update();
            reloadScreen();
        }else{
            create();
        };
      
        // Wait a while for the user to see the feedback message, then clear the screen
    };

    const handleMessageClcik = (reload) => {
        setMessage({});
        if(reload) reloadScreen(500);
    }

    const handleEnd = () => {

        const current = findsNull('end', [...pOEventContext.state.list])[0];
        const end_hour_meterMsg = validField(formData.end_hour_meter, 'required');

        setInputHelper((prev) => ({
            ...prev,
            end_hour_meter : {
                msg: end_hour_meterMsg
            }
        }));

        if(end_hour_meterMsg) return;

        //Checks if there is an open event on the order , if so, not allow to finish
        if(current){
            setMessage({
               msg: 'Existe uma ocorrência em aberto vinculado a está ordem.A mesma não poderá ser finalizada.',
               type: 'ALERT'
            });
            return;
        }
        setMessage({
           msg: 'Após finalizada a ordem de produção não poderá ser alterada.',
           type: 'ERROR'
        });
    };

    const handleCancel = () => {
        setMessage({});
    }

    const handleFinish = () => {
        const end = new Date();
        const data = { end: end, end_hour_meter: formData.end_hour_meter};
        updateProductionOrder(productionOrderContext.dispatch, data , selected['id']);
        reloadScreen(500);
    }

    return (
        <MainContainer>
            <Header 
            title={'Ordem de Produção'} 
            handleClick={handleSearchDisplay} 
            search={true} 
            maxwidth={'820px'}
            />
            {
                //After an event on this page , shows the feedback message
                (selected && selected.end) && (
                    <div style={{width: '99%'}}>
                        <SnackBarComponent 
                            title={'Ordem Finalizada'}
                            type={'SUCCESS'}
                            width={''}
                        />  
                    </div>
                ) 
            }
            <FormContainer
                isMobile={isMobile}
            >
                <FormHeader isTablet={isTablet} isSmall={isSmall}>
                    <HeaderRow isMobile={isMobile}>
                        <Container>
                            <Field 
                                title={'Código'} 
                                value={formData.id}
                            />

                            <Wrapper/>
                            
                            <SearchInput 
                                title={'Máquina'} 
                                placeholder={'Pesquise'}
                                data={machineContext.state.list}
                                handleChangeFather={handleMachineChange}
                                field={'name'} 
                                captureValue={captureMachine}
                                value={formData.machine && formData.machine.name}
                                pro={true}
                                validMsg={inputHelper.machine.msg}
                                disabled={disabled}
                            />
                        </Container>

                        <Wrapper/>

                        <Container>
                            <SearchInput 
                                title={'Líder'} 
                                placeholder={'Pesquise'}
                                data={leaderContext.state.list}
                                handleChangeFather={handleLeaderChange}
                                field={'name'} 
                                captureValue={captureLeader}
                                value={formData.leader && formData.leader.name}
                                pro={true}
                                validMsg={inputHelper.leader.msg}
                                disabled={disabled}
                            />
                            <Wrapper/>
                            <SearchInput 
                                title={'Turno'} 
                                placeholder={'Pesquise'}
                                data={[
                                    {
                                        name: 'MANHA'
                                    },
                                    {
                                        name: 'TARDE'
                                    }
                                ]}
                                handleChangeFather={handleShiftChange}
                                field={'name'} 
                                captureValue={captureShift}
                                value={formData.shift && formData.shift}
                                pro={true}
                                validMsg={inputHelper.shift.msg}
                                disabled={disabled}
                            />
                        </Container>
                        <Wrapper/>
                        <Container>
                            <InputPro 
                                title={'Horímetro Inicial'} 
                                value={formData.initial_hour_meter && formData.initial_hour_meter}
                                validMsg={inputHelper.initial_hour_meter && inputHelper.initial_hour_meter.msg} 
                                inputType={'number'}
                                name={'initial_hour_meter'}
                                handleChange={handleChange}
                                disabled={disabled}

                            />
                            <Wrapper/>
                            <InputPro 
                                title={'Horímetro Final'} 
                                value={formData.end_hour_meter && formData.end_hour_meter}
                                validMsg={inputHelper.end_hour_meter && inputHelper.end_hour_meter.msg} 
                                inputType={'number'}
                                name={'end_hour_meter'}
                                handleChange={handleChange}
                            />
                        </Container>
                    </HeaderRow>
                </FormHeader>
                    <SelectTableContainer isMobile={isMobile}>
                        <ListOptions 
                            title={'Operadores'}
                            data={operatorContext.state.list} 
                            currentItems={operators}
                            field={'name'}
                            handleListAdd={handleOperatorListAdd}
                            handleListDel={handleOperatorListDel}
                            margin={'0 0 15px 0'}
                            maxwidth='100%'
                            validMsg={inputHelper.operators && inputHelper.operators.msg}   
                            showDelete={!disabled}                      
                        />
                        <Wrapper/>
                        <ListOptions 
                            title={'Produtos'}
                            data={allowedProducts} 
                            currentItems={products}
                            field={'name'}
                            handleListAdd={handleProductListAdd}
                            handleListDel={handleProductListDel}
                            maxwidth='100%'
                            validMsg={inputHelper.products && inputHelper.products.msg}  
                            showDelete={!disabled}                         
                        />
                    </SelectTableContainer>
                    {
                        selected && (
                            <SelectTableContainer isMobile={isMobile}>
                                <TableList
                                    title={'Tiragens'}
                                    columns={withdrawCols} 
                                    data={decodedList} 
                                    tableId={tableId}
                                    unique={false}
                                    field={'product_id'}
                                    maxWidth='100%'
                                    searchData={products}
                                    margin={'0 0 15px 0'}
                                />
                             </SelectTableContainer>
                        )
                    }
                    <SelectTableContainer isMobile={isMobile}>
                        <TextInput 
                            title={'Observação'}
                            name={'obs'}
                            maxwidth='100%'
                            value={formData.obs && formData.obs}
                            handleChange={handleChange}
                        />
                    </SelectTableContainer>
                    {
                        //If the order has been closed, it is not possible to modify it
                        !(selected && selected.end) && (
                            <ButtonContainer selected={!!!selected}>
                                {
                                    // If a operator has been  selected, shows the finish option
                                    (selected && !disabled) && (
                                        <>
                                            <GenericButton  
                                                maxwidth={'100%'}
                                                text='Finalizar' 
                                                handleClick={handleEnd} 
                                                background={'primary'}
                                            />
                                            <div style={{width: '20px'}}/> 
                                        </>      
                                    )             
                                }
                                
                                <GenericButton  
                                    maxwidth={'100%'}
                                    text='Gravar' 
                                    handleClick={handleClick} 
                                    background={'success'}
                                />       
                            </ButtonContainer>
                        )
                    }
                    <Wrapper/>
            </FormContainer>
            {
                (message.msg && message.type === 'ALERT') && (
                    <FixedContainerComponent isMobile={(isMobile || isTablet)}>
                        <MessageComponent 
                            title={'Warning'} 
                            message={message.msg}
                            btnText={'OK'}
                            handleClick={() => handleMessageClcik(false)}
                            background={'warning'} 
                        />
                    </FixedContainerComponent>
                )
            }
            {
                (message.msg && message.type === 'SAVE') && (
                    <FixedContainerComponent isMobile={(isMobile || isTablet)}>
                        <MessageComponent 
                            title={'Success'} 
                            message={message.msg}
                            btnText={'OK'}
                            handleClick={() => handleMessageClcik(true)}
                            background={'success'} 
                        />
                    </FixedContainerComponent>
                )
            }
            {
                (message.msg && message.type === 'ERROR') && (
                    <FixedContainerComponent isMobile={(isMobile || isTablet)}>
                        <MessageComponent 
                            title={'Alert'} 
                            message={message.msg}
                            btnText={'OK'}
                            handleClick={handleFinish}
                            handleCancel={handleCancel}
                            background={'alert'} 
                        />
                    </FixedContainerComponent>
                )
            }
            {
               searchOpen && ( 
                    <FixedContainerComponent isMobile={(isMobile || isTablet)}>
                        <SearchTableComponent 
                            title={'Ordens de Produção'} 
                            data={searchData}
                            columns={searchCols}
                            tableId={'search-table'}
                            handleClick={captureValue}
                            handleExit={handleExit}
                        />
                    </FixedContainerComponent>
               )
            }
        </MainContainer>
    )
}

export default ProductionOrderRegisterPage;
