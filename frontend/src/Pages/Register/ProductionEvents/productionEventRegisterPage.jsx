import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductionOrderContext } from '../../../contexts/ProductionOrderProvider/context';
import { MachineContext } from '../../../contexts/MachineProvider/context';
import { BreakSolutionContext } from '../../../contexts/BreakSolutionProvider/context';
import { BreakReasonContext } from '../../../contexts/BreakReasonProvider/context';
import { MechanicContext } from '../../../contexts/MechanicProvider/context';
import { POEventContext} from '../../../contexts/POEventProvider/context';
import { POOperatorContext } from '../../../contexts/POOperatorProvider/context';

import SearchTableComponent from '../../../components/SearchTable';
import MainFormContainer from '../../../components/MainFormContainer';
import AutoComplete from '../../../components/AutoComplete';
import GenericButton from '../../../components/Button';
import Field from '../../../components/Field';
import FixedContainerComponent from '../../../components/FixedContainer';

import { reloadScreen, formatDate} from '../../../Utils/formMethods';
import { findsByField, findsNull } from '../../../Utils/gridMethods';
import { validField } from '../../../Utils/inputValidations';

import { listProductionOrder } from '../../../contexts/ProductionOrderProvider/actions';
import {  listMachine } from '../../../contexts/MachineProvider/actions';
import { listBreakSolutionActive } from '../../../contexts/BreakSolutionProvider/actions';
import { listBreakReasonActive } from '../../../contexts/BreakReasonProvider/actions';
import {  listMechanicActive } from '../../../contexts/MechanicProvider/actions';
import { listPOEvent, createPOEvent, updatePOEvent } from '../../../contexts/POEventProvider/actions';
import { getByOperator } from '../../../contexts/POOperatorProvider/actions';
import { getSearchDataProduction } from '../../../Utils/ProductionForms/getSearchDataProduction';
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

function ProductionEventRegisterPage() {
    const navigate = useNavigate();
    // If the user selects a register to modify , it will be load to this state
    const [selected, setSelected] = useState(null);
    const [searchData, setSearchData] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);

    const [formData, setFormData] = useState({
        order_id: '',
        break_reason : null,
        break_solution: null,
        mechanic: null,
        start:  '',
        end: '',
    });
    
    const [inputHelper, setInputHelper] = useState({
        break_reason: {
            msg: ''
        },
        break_solution: {
            msg: ''
        },
        mechanic: {
            msg: ''
        },
    });

    const disabled = JSON.parse(localStorage.getItem('is_operator')) && selected;

    const isMounted = useRef(true);

    const machineContext = useContext(MachineContext);
    const breakReasonContext = useContext(BreakReasonContext);
    const breakSolutionContext = useContext(BreakSolutionContext);
    const mechanicContext = useContext(MechanicContext);
    const pOEventContext = useContext(POEventContext);
    const pOOperatorContext = useContext(POOperatorContext)
    
    const productionOrderContext = useContext(ProductionOrderContext);


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

        listMachine(machineContext.dispatch).then((dispatch) =>{
            if(isMounted.current){
                dispatch();
            };
        });

        listBreakReasonActive(breakReasonContext.dispatch).then((dispatch) =>{
            if(isMounted.current){
                dispatch();
            };
        });

        listBreakSolutionActive(breakSolutionContext.dispatch).then((dispatch) =>{
            if(isMounted.current){
                dispatch();
            };
        });

        listMechanicActive(mechanicContext.dispatch).then((dispatch) =>{
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
        breakReasonContext.dispatch,
        breakSolutionContext.dispatch,
        mechanicContext.dispatch,
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

    // Capture the chosen breakReason on the AUTOCOMPLENTE breakReason
    const captureBreakReason = useCallback((value) => {
        setFormData({
            ...formData,
            break_reason: value
        });
    },[formData]);

    // Capture the chosen breakSolution on the AUTOCOMPLENTE breakSolution
    const captureBreakSolution = useCallback((value) => {
        setFormData({
            ...formData,
            break_solution: value
        });
    },[formData]);

    // Capture the chosen mechanic on the AUTOCOMPLENTE mechanic
     const captureMechanic = useCallback((value) => {
        setFormData({
            ...formData,
            mechanic: value
        });
    },[formData]);
    

    // Capture "Search" chosen object and update the values of all inputs ,
    const captureProduction = useCallback((value) => {
        setSelected(null);
        setInputHelper(
            { 
                break_reason: {
                    msg: ''
                },
                break_solution: {
                    msg: ''
                },
                mechanic: {
                    msg: ''
                },
            }  
        );
        const order = findsByField('id', value[0].id, productionOrderContext.state.list)[0];
        listPOEvent(pOEventContext.dispatch, order.id);

        setFormData((prev) => ({
            ...prev,
            order_id: order.id,
            break_reason: null,
            start: new Date(),
        }));
        setSearchOpen(false);
    },[productionOrderContext.state.list, pOEventContext.dispatch]);

    // If the production order already has an open event loads the data  
    useEffect(() => {
        if(pOEventContext.state.list){
            const current = findsNull('end', [...pOEventContext.state.list])[0];
            if(current){
                setSelected(current);
                setFormData((prev) => ({
                    ...prev,
                    break_reason: findsByField('id', current.break_reason_id, breakReasonContext.state.list)[0],
                    start: new Date(current.start)
                }));
            }
        }
    },[breakReasonContext.state.list,pOEventContext.state.list]);

    // Save the data on the api
    const handleClick = () => {

        // Data to create or updata a register
        const data = {
            order_id: formData.order_id,
            break_reason_id: formData.break_reason.id,
            start: formData.start,
            break_solution_id: formData.break_solution && formData.break_solution.id,
            mechanic_id: formData.mechanic && formData.mechanic.id,
        };

        // If one register has been selected, update its values otherwise create a new 
        if(selected){
            updatePOEvent(pOEventContext.dispatch, data, selected.id);
        }else{

            const breakReasonMsg = validField(formData.break_reason, 'required');

            setInputHelper((prev) => ({
                ...prev,
                break_reason : {
                    msg: breakReasonMsg
                }
            }));
    
            if(breakReasonMsg) return;

            createPOEvent(data);
        };

        // Wait a while for the user to see the feedback message, then clear the screen
        reloadScreen();
    };

    const handleEnd = () => {

        // Data to create or updata a register
        const data = {
            order_id: formData.order_id,
            break_reason_id: formData.break_reason.id,
            start: formData.start,
            break_solution_id: formData.break_solution && formData.break_solution.id,
            mechanic_id: formData.mechanic && formData.mechanic.id,
        };

        if(selected){

            const breakSolutionMsg = validField(formData.break_solution, 'required');

            setInputHelper((prev) => ({
                ...prev,
                break_solution : {
                    msg: breakSolutionMsg
                }
            }));

            const mechanicMsg = validField(formData.mechanic, 'required');

            setInputHelper((prev) => ({
                ...prev,
                mechanic : {
                    msg: mechanicMsg
                }
            }));


            if(breakSolutionMsg || mechanicMsg ) return;
            
            data.end = new Date();

            updatePOEvent(pOEventContext.dispatch, data, selected.id);
            reloadScreen();
        }
    }

    return (
        <MainFormContainer
            title={'Ocorrências'}
            loading={productionOrderContext.state.loading}
            handleClick={handleSearchDisplay}
            isRestrict={false}
        >
            <Field
                title={'Código Ordem'}
                value={formData.order_id && formData.order_id}
                margin={'15px 0 15px 0'} 
            />
            <Field 
                title={'Início'}
                value={formData.start && formatDate(formData.start)}
                margin={'0 0 15px 0'}
            />
            <AutoComplete 
                margin={'0 0 15px 0'}
                title={'Motivo'} 
                placeholder={'Pesquise'}
                data={breakReasonContext.state.list}
                field={'name'} 
                captureValue={captureBreakReason}
                value={formData.break_reason && formData.break_reason.name}
                pro={true}
                disabled={disabled}
                validMsg={inputHelper.break_reason.msg}
            />
            <AutoComplete 
                margin={'0 0 15px 0'}
                title={'Solução'} 
                placeholder={'Pesquise'}
                data={breakSolutionContext.state.list}
                field={'name'} 
                captureValue={captureBreakSolution}
                value={formData.break_solution && formData.break_solution.name}
                pro={true}
                validMsg={inputHelper.break_solution.msg}
            />
            <AutoComplete 
                margin={'0 0 15px 0'}
                title={'Mecânico'} 
                placeholder={'Pesquise'}
                data={mechanicContext.state.list}
                field={'name'} 
                captureValue={captureMechanic}
                value={formData.mechanic && formData.mechanic.name}
                pro={true}
                validMsg={inputHelper.mechanic.msg}
            />
            <Container style={{marginTop: '7px'}}>
                    {
                        // If a operator has been  selected, shows the delete option
                        selected ? (
                            <GenericButton  
                                text='Finalizar' 
                                handleClick={handleEnd} 
                                background={'primary'}
                            />
                        )
                        :
                        (
                            <GenericButton  
                                text='Gravar' 
                                handleClick={handleClick} 
                                background={'success'}
                            />
                        )
                    }       
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

export default ProductionEventRegisterPage;
