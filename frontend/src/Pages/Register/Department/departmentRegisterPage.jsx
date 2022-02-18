import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { DepartmentContext } from '../../../contexts/DepartmentsProvider/context'; 

import MainFormContainer from '../../../components/MainFormContainer';
import AutoComplete from '../../../components/AutoComplete';
import InputPro from '../../../components/InputPro';
import GenericButton from '../../../components/Button';
import SnackBarComponent from '../../../components/SnackBar';
import ActiveLabelComponent from '../../../components/ActiveLabel';

import { validField } from '../../../Utils/inputValidations';
import { reloadScreen, arrayToState } from '../../../Utils/formMethods';

import { listDepartment, createDepartment, updateDepartment, deleteDepartment } from '../../../contexts/DepartmentsProvider/actions';
import { Container } from '../styles';

function DepartmentRegisterPage({formInputs}) {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    const inputs = arrayToState(formInputs)  
    const [formData, setFormData] = useState({
        inputs
    });

    const [inputHelper, setInputHelper] = useState({
        name : {
            msg: ''
        }
    });

    const isMounted = useRef(true);

    const departmentContext = useContext(DepartmentContext);

    const loadData = useCallback(() => {

        // Load the data from the Api

        listDepartment(departmentContext.dispatch).then((dispatch) =>{
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

        return () => {
            isMounted.current = false;
        }
    },[departmentContext.dispatch, navigate]);

    // Load the data when the component is mounted
    useEffect(() => {
        loadData();
    },[loadData]);


    // Capture "AUTOCOMPLET" chosen object and update the values of all inputs ,
    const captureValue = (value) => {
        setSelected(value);
        setFormData({
            ...formData,
            active: value.active,
            name: value.name,
        });
    };


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
        
        if(nameMsg) return;

        // If one register has been selected, update its values otherwise create a new register
        if(selected){
            updateDepartment(departmentContext.dispatch, formData, selected['id']);
        }else{
            createDepartment(departmentContext.dispatch, formData);
        };
      
        // Wait a while for the user to see the feedback message, then clear the screen
        reloadScreen();
    };
    
    // const handleDeleteClick = () => {
    //     deleteDepartment(departmentContext.dispatch, selected['id'], selected['name']);
    //     reloadScreen();
    // };

    return (
        <MainFormContainer
            title={'Cadastro de departamento de Produto'}
            loading={departmentContext.state.loading}
        >

            {
                // After an event on this page , shows the feedback message
                departmentContext.state.feedback && (
                    <Container>
                        <SnackBarComponent 
                            title={departmentContext.state.feedback}
                            type={departmentContext.state.error ? 'FAIL' : 'SUCCESS'}
                        />  
                    </Container>
                ) 
            }

            <AutoComplete 
                margin={'0 0 100px 0'}
                title={'Pesquise'} 
                placeholder={'Pesquise'}
                data={departmentContext.state.list}
                field={'name'} 
                captureValue={captureValue}
                handleChangeFather={handleSearchChange}
                pro={true}
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
            <Container>
                    <GenericButton  
                        text='Gravar' 
                        handleClick={handleClick} 
                        background={'success'}
                    />
                {/* {
                    // If a register has been  selected, shows the delete option
                    selected && (
                        <>
                            <span style={{width: '20px'}}></span>
                                <GenericButton  
                                    text='Deletar' 
                                    handleClick={handleDeleteClick} 
                                    background={themeState.themeColors.warning}
                                />
                        </>
                    )
                } */}
            </Container>
        </MainFormContainer>
    )
}

export default DepartmentRegisterPage;
