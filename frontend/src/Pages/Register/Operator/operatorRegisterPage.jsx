import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { OperatorContext } from '../../../contexts/OperatorProvider/context';
import { SectorContext } from '../../../contexts/SectorProvider/context';
import { OperatorSectorContext } from '../../../contexts/OperatorSectorProvider/context';

import MainFormContainer from '../../../components/MainFormContainer';
import AutoComplete from '../../../components/AutoComplete';
import InputPro from '../../../components/InputPro';
import GenericButton from '../../../components/Button';
import SnackBarComponent from '../../../components/SnackBar';
import ActiveLabelComponent from '../../../components/ActiveLabel';
import ListOptions from '../../../components/ListOptions';

import { validField } from '../../../Utils/inputValidations';
import { reloadScreen, arrayToState } from '../../../Utils/formMethods';
import { findsByField, removeById } from '../../../Utils/gridMethods';

import {listOperator, createOperator, updateOperator } from '../../../contexts/OperatorProvider/actions';
import { listSectorActive } from '../../../contexts/SectorProvider/actions';
import { cleanOperatorSector, getOperatorSectors, deleteOperatorSector, createOperatorSector } from '../../../contexts/OperatorSectorProvider/actions';
import { Container } from '../styles';

function OperatorRegisterPage({formInputs}) {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    const inputs = arrayToState(formInputs);  
    const [formData, setFormData] = useState({
        inputs
    });

    const [inputHelper, setInputHelper] = useState({
        name: {
            msg: ''
        },
        salary: {
            msg: ''
        },
        sectors: {
            msg: ''
        }
    });

    const [sectors, setSectors] = useState([]);

    const isMounted = useRef(true);

    const operatorContext = useContext(OperatorContext);
    const sectorContext = useContext(SectorContext);
    const operatorSectorContext = useContext(OperatorSectorContext);

    const loadData = useCallback(() => {

        // Load the data from the Api

        listOperator(operatorContext.dispatch).then((dispatch) =>{
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

        listSectorActive(sectorContext.dispatch).then((dispatch) =>{
            if(isMounted.current){
                dispatch();
            };
        });

        cleanOperatorSector(operatorSectorContext.dispatch);

        return () => {
            isMounted.current = false;
        }
    },[operatorContext.dispatch, sectorContext.dispatch, operatorSectorContext.dispatch, navigate]);

    // Load the data when the component is mounted
    useEffect(() => {
        loadData();
    },[loadData]);


    // Capture "AUTOCOMPLET" chosen operator object and update the values of all inputs ,
    const captureValue = (value) => {
        // Cleans varibles to avoid a conflict 
        setSectors([]);
        setSelected(value);

        setFormData({
            ...formData,
            active: value.active,
            name: value.name,
            salary: value.salary,
        });

        getOperatorSectors(operatorSectorContext.dispatch, value['id']);
    }

    // Loads the already saved sectors to the screen, whenever it reloads
    useEffect(() => {
        for(let i in operatorSectorContext.state.list){
            setSectors((s) => [
                ...s,
                ...findsByField('id', operatorSectorContext.state.list[i]['sector_id'], sectorContext.state.list)
            ])
        }
    },[operatorSectorContext.state.list, sectorContext.state.list]);


    const handleSearchChange = () => {
        // if the name is changed, the selected value will be cleaned 
        setSelected(null);
    }


    const handleChange = (e) => {   
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    // Capture whenever a item is add to the Sectors' lsit on the list component and add to this component list
    const handleListAdd = useCallback((value) => {
        setSectors((s) => [...s, value]);
    },[]);

    const handleListDel  = (pk) => {
        setSectors((s) => [...removeById('id', pk , s)]);
    }

    // Changes the active status
    const handleActiveClick = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            active: !prev.active,
        }))
    },[]);

    // Save the data on the api
    const handleClick = () => {

        const nameMsg = validField(formData.name, 'text');

        setInputHelper((prev) => ({
            ...prev,
            name : {
                msg: nameMsg
            }
        }));

        const salaryMsg = validField(formData.salary, 'number');

        setInputHelper((prev) => ({
            ...prev,
            salary : {
                msg: salaryMsg
            }
        }));

        const sectorsMsg = validField(sectors, 'selector');

        setInputHelper((prev) => ({
            ...prev,
            sectors : {
                msg: sectorsMsg
            }
        }));

        if(nameMsg || salaryMsg || sectorsMsg) return;

        const createOperatorSectorList = (operatorId) => {
            for(let i in sectors){
                createOperatorSector(operatorSectorContext.dispatch, operatorId, sectors[i]['id']);
            };
        }

        const update = () => {
            updateOperator(operatorContext.dispatch, formData, selected['id']);
            // Drops all established products in the machine , before reset them.
            deleteOperatorSector(selected['id'], true, () => createOperatorSectorList(selected['id'], sectors));
        }

        // If one operator has been selected, update its values otherwise create a new operator
        if(selected){
            update();
        }else{
            createOperator(operatorContext.dispatch, formData, createOperatorSectorList);
        };
      
        // Wait a while for the user to see the feedback message, then clear the screen
        reloadScreen();
    };

    return (
        <MainFormContainer 
            title={'Cadastro de Operador'} 
            loading={operatorContext.state.loading}
        >
            {
                // After an event on this page , shows the feedback message
                operatorContext.state.feedback && (
                    <Container>
                        <SnackBarComponent 
                            title={operatorContext.state.feedback}
                            type={operatorContext.state.error ? 'FAIL' : 'SUCCESS'}
                        />  
                    </Container>
                ) 
            }

            <AutoComplete 
                margin={'0 0 35px 0'}
                title={'Pesquise'} 
                placeholder={'Pesquise'}
                data={operatorContext.state.list}
                field={'name'} 
                captureValue={captureValue}
                handleChangeFather={handleSearchChange}
                pro={true}
                checkbox={true}
            />
            {
                selected && (
                    <Container>
                        <ActiveLabelComponent 
                            active={selected ? selected['active'] : false} 
                            handleClick={handleActiveClick}
                        />
                    </Container>
                )
            }
            {
                formInputs.map((item) => { 
                    return (
                        item.type && (
                        <InputPro 
                            key={item.id}
                            title={item.desc}
                            inputType={item.type} 
                            handleChange={handleChange}
                            name={item.name}
                            value={formData[item.name]}
                            validMsg={inputHelper[item.name] && inputHelper[item.name].msg}
                            margin={'0 0 15px 0'}
                        />) 
                    );
                })
            }
            <ListOptions 
                title={'Setores'}
                data={sectorContext.state.list} 
                currentItems={sectors}
                field={'name'}
                handleListAdd={handleListAdd}
                handleListDel={handleListDel}
                margin={'0 0 15px 0'}
                validMsg={inputHelper.sectors && inputHelper.sectors.msg}                         
            />
            <Container>
                    <GenericButton  
                        text='Gravar' 
                        handleClick={handleClick} 
                        background={'success'}
                    />
            </Container>
        </MainFormContainer>
    )
}

export default OperatorRegisterPage;
