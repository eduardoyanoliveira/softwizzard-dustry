import React, { useContext, useState} from 'react';
import { axiosInstance } from '../../../axios';

import { DimensionsContext } from '../../../contexts/Dimensions/context';

import InputPro from '../../../components/InputPro';
import GenericButton from '../../../components/Button';
import SnackBarComponent from '../../../components/SnackBar';

import { reloadScreen } from '../../../Utils/formMethods';
import { validField } from '../../../Utils/inputValidations';
import { arrayToState } from '../../../Utils/formMethods';
import { Container, FormContainer, Header, LoginScreen, MainFormContainer } from './styles';

const getUserData= async(email) => {
    const url = `users/custom_user/0/?email=${email}`;
    const  {data} = await axiosInstance.get(url);
    return data;
};

function UserLoginPage({formInputs}) {

    const inputs = arrayToState(formInputs);
    const [formData, setFormData] = useState({
        inputs
    });

    const [inputHelper, setInputHelper] = useState({
        email : {
            msg: ''
        },
        password : {
            msg: ''
        },
        login : {
            msg: ''
        }
    });

    const dimensions = useContext(DimensionsContext);

    let mainWidth = '90%';

    if(dimensions === 'ULTRA'){
        mainWidth = '60%';
    }

    if(dimensions === 'LARGE'){
        mainWidth = '80%';
    }

    const handleChange = (e) => {  

        setInputHelper((prev) => ({
            ...prev,
            login : {
                msg: ''
            }
        })); 

        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    // Save the data on the api
    const handleClick = () => {
        const emailMsg = validField(formData.email, 'text');

        setInputHelper((prev) => ({
            ...prev,
            email : {
                msg: emailMsg
            }
        }));

        const passwordMsg = validField(formData.password, 'text');

        setInputHelper((prev) => ({
            ...prev,
            password : {
                msg: passwordMsg
            }
        }));
        
        if(emailMsg || passwordMsg) return;

        axiosInstance.post('token/', {
            ...formData
        }).then((res) => {
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            axiosInstance.defaults.headers['Authorization'] = `JWT ${localStorage.getItem('access_token')}`;
            
            localStorage.setItem('is_dark', true);

            // Get if the user is a operator
            getUserData(formData.email)
            .then((data) => {
                localStorage.setItem('is_operator', data[0].is_operator);
                localStorage.setItem('operator_id', data[0].operator_id);
            })
            reloadScreen(500);
            
        }).catch((error) => {
            setInputHelper((prev) => ({
                ...prev,
                login : {
                    msg: 'Falha, verifique se os campos de email e senha estão corretos'
                }
            }));
        })


        // Wait a while for the user to see the feedback message, then clear the screen
    };

    const handleEnterClick = (event) => {
        if(event.key === 'Enter' && formData.password && formData.email){
            handleClick();
        }
    }

    return (
        <LoginScreen >
            <MainFormContainer mainWidth={mainWidth}>
                <Header> 
                    Log In: 
                </Header>
                <FormContainer>
                    {
                        // If there is a errorv in the log in values
                        inputHelper.login.msg && (
                            <Container>
                                <SnackBarComponent 
                                    title={inputHelper.login.msg}
                                    type={'FAIL' }
                                />  
                            </Container>
                        ) 
                    }
                    {
                        formInputs.map((item) => {    
                            return (
                                item.type ? (
                                <InputPro 
                                    key={item.id}
                                    title={item.desc}
                                    inputType={item.type} 
                                    handleChange={handleChange}
                                    name={item.name}
                                    value={formData[item.name]}
                                    validMsg={inputHelper[item.name] && inputHelper[item.name].msg}
                                    margin={'0 0 15px 0'}
                                    handleKeyDown={handleEnterClick}
                                />) : null
                            );
                        })
                    }
                    <Container>
                        <GenericButton  
                            text='Entrar' 
                            handleClick={handleClick} 
                            background={'success'}
                        />
                    </Container>
                </FormContainer>
            </MainFormContainer>
        </LoginScreen>
    )
}

export default UserLoginPage;
