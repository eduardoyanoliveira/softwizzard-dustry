import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { MechanicContext } from '../../../contexts/MechanicProvider/context';

import MainFormContainer from '../../../components/MainFormContainer';
import AutoComplete from '../../../components/AutoComplete';
import InputPro from '../../../components/InputPro';
import GenericButton from '../../../components/Button';
import SnackBarComponent from '../../../components/SnackBar';
import ActiveLabelComponent from '../../../components/ActiveLabel';

import { validField } from '../../../Utils/inputValidations';
import { reloadScreen } from '../../../Utils/formMethods';

import { arrayToState } from '../../../Utils/formMethods';
import { listMechanic, updateMechanic, createMechanic } from '../../../contexts/MechanicProvider/actions';
import { Container } from '../styles';


function MechanicRegisterPage({formInputs}) {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    const inputs = arrayToState(formInputs)  
    const [formData, setFormData] = useState({
        inputs
    });

    const [inputHelper, setInputHelper] = useState({
        name : {
            msg: ''
        },
        value_per_hour: {
            msg: ''
        },
    });

    const isMounted = useRef(true);

    const mechanicContext = useContext(MechanicContext);

    const loadData = useCallback(() => {

        // Load the data from the Api

        listMechanic(mechanicContext.dispatch).then((dispatch) =>{
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
    },[mechanicContext.dispatch, navigate]);

    // Load the data when the component is mounted
    useEffect(() => {
        loadData();
    },[loadData]);

      // Capture "AUTOCOMPLET" chosen object and update the values of all inputs ,
      const captureValue = (value) => {
        setSelected(value);
        setFormData({
            ...formData,
            name: value.name,
            value_per_hour: value.value_per_hour,
            outsourced: value.outsourced,
            active: value.active
        });
    }


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
    const handleOutsourcedClick = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            outsourced: !prev.outsourced,
        }))
    },[]);
    
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

        const cashMsg = validField(formData.value_per_hour, 'number');

        setInputHelper((prev) => ({
            ...prev,
            value_per_hour : {
                msg: cashMsg
            }
        }));
        
        if(nameMsg || cashMsg) return;

        // If one operator has been selected, update its values otherwise create a new operator
        if(selected){
            updateMechanic(mechanicContext.dispatch, formData, selected['id']);;
        }else{
            createMechanic(mechanicContext.dispatch, formData);  
        };
      
        // Wait a while for the user to see the feedback message, then clear the screen
        reloadScreen();
    };

    return (
        <MainFormContainer
            title={'Cadastro de Mecânico'}
            loading={mechanicContext.state.loading}
        >
            {
                // After an event on this page , shows the feedback message
                mechanicContext.state.feedback && (
                    <Container>
                        <SnackBarComponent 
                            title={mechanicContext.state.feedback}
                            type={mechanicContext.state.error ? 'FAIL' : 'SUCCESS'}
                        />  
                    </Container>
                ) 
            }

            <AutoComplete 
                margin={'0 0 55px 0'}
                title={'Pesquise'} 
                placeholder={'Pesquise'}
                data={mechanicContext.state.list}
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
            <Container style={{marginBottom: '10px'}}>
                    <ActiveLabelComponent 
                        title='Tercerizado?'
                        active={formData.outsourced} 
                        handleClick={handleOutsourcedClick}
                    />
                    </Container>
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

export default MechanicRegisterPage;
