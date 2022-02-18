import React, { useContext, useState, useCallback, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom'

import { OperatorContext } from '../../../contexts/OperatorProvider/context';
import { UserContext } from '../../../contexts/UserProvider/context';

import MainFormContainer from '../../../components/MainFormContainer';
import InputPro from '../../../components/InputPro';
import GenericButton from '../../../components/Button';
import AutoComplete from '../../../components/AutoComplete';
import SnackBarComponent from '../../../components/SnackBar';
import ActiveLabelComponent from '../../../components/ActiveLabel';

import { validField } from '../../../Utils/inputValidations';
import { findsByField } from '../../../Utils/gridMethods';
import { reloadScreen, arrayToState } from '../../../Utils/formMethods';

import { listOperatorActive } from '../../../contexts/OperatorProvider/actions';
import { listUser, createUser, updateUser } from '../../../contexts/UserProvider/actions';
import { Container } from '../styles';

function UserRegisterPage({formInputs}) {
    const navigate = useNavigate();
    const isMounted = useRef(true);
    const [selected, setSelected] = useState(null);

    const inputs = arrayToState(formInputs);
    const [formData, setFormData] = useState({
        inputs,
        operator: null,
    });

    const [inputHelper, setInputHelper] = useState({
        email : {
            msg: ''
        },
        user_name: {
            msg: ''
        },
        password: {
            msg: ''
        },
        operator: {
            msg: ''
        }
    });

    const operatorContext = useContext(OperatorContext);
    const userContext = useContext(UserContext);

    const loadData = useCallback(() => {

        // Load the data from the Api
        listUser(userContext.dispatch).then((dispatch) =>{
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

        listOperatorActive(operatorContext.dispatch).then((dispatch) =>{
            if(isMounted.current){
                dispatch();
            };
        });

        return () => {
            isMounted.current = false;
        }

    },[
        userContext.dispatch,
        operatorContext.dispatch,
        navigate
    ]);

    // Load the data when the component is mounted
    useEffect(() => {
        loadData();
    },[loadData]);

    // Capture "AUTOCOMPLET" chosen object and update the values of all inputs ,
    const captureValue = (value) => {
        setSelected(value);
        setFormData({
            ...formData,
            is_active: value.is_active,
            email: value.email,
            user_name: value.user_name,
            password: value.password,
            operator: findsByField('id', value['operator_id'], operatorContext.state.list)[0]
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

    const captureOperator = useCallback((value) => {
        setFormData({
            ...formData,
            operator: value
        });
    },[formData]);

    // Changes the active status
    const handleActiveClick = useCallback(() => {
        setFormData((prev) => ({
            ...prev,
            is_active: !prev.is_active,
        }))
    },[]);

    // Save the data on the api
    const handleClick = () => {

        const emailMsg = validField(formData.email, 'text');

        setInputHelper((prev) => ({
            ...prev,
            email : {
                msg: emailMsg
            }
        }));

        const userNameMsg = validField(formData.user_name, 'text');

        setInputHelper((prev) => ({
            ...prev,
            user_name : {
                msg: userNameMsg
            }
        }));

        const passwordMsg = validField(formData.password, 'password');

        setInputHelper((prev) => ({
            ...prev,
            password : {
                msg: passwordMsg
            }
        }));

        const operatorMsg = validField(formData.operator, 'required');

        setInputHelper((prev) => ({
            ...prev,
            operator : {
                msg: operatorMsg
            }
        }));
        
        if(emailMsg || userNameMsg || passwordMsg || operatorMsg) return;

        const data = {
            is_active: selected ? formData.is_active : true,
            email: formData.email,
            user_name: formData.user_name,
            password: formData.password,
            operator_id: formData.operator.id
        }

        console.log(data)

        if(selected){
            updateUser(userContext.dispatch, data, selected['id'])
        }else{
            createUser(userContext.dispatch, data);
        }

        // Wait a while for the user to see the feedback message, then clear the screen
        reloadScreen();
    };
 
    return (
        <MainFormContainer
            title={'Cadastro de Usuário'}
            loading={userContext.state.loading}
        >
            <AutoComplete 
                margin={'0 0 50px 0'}
                title={'Pesquise'} 
                placeholder={'Pesquise'}
                data={userContext.state.list}
                value={selected && selected.name}
                field={'user_name'} 
                captureValue={captureValue}
                handleChangeFather={handleSearchChange}
                pro={true}
            />
            {
                //After an event on this page , shows the feedback message
                userContext.state.feedback && (
                    <Container>
                        <SnackBarComponent 
                            title={userContext.state.feedback}
                            type={userContext.state.error ? 'FAIL' : 'SUCCESS'}
                        />  
                    </Container>
                ) 
            }
            {
                selected && (
                    <Container>
                        <ActiveLabelComponent 
                            active={selected ? selected['is_active'] : false} 
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
            <AutoComplete 
                margin={'0 0 15px 0'}
                title={'Operador'} 
                placeholder={'Vincule o Operador'}
                data={operatorContext.state.list}
                field={'name'} 
                captureValue={captureOperator}
                value={formData.operator && formData.operator.name}
                pro={true}
                validMsg={inputHelper.operator.msg}
            />
            <Container>
                    <GenericButton  
                        margin={'20px 0 0 0'}
                        text='Gravar' 
                        handleClick={handleClick} 
                        background={'success'}
                    />
            </Container>
        </MainFormContainer>

    )
}

export default UserRegisterPage;
