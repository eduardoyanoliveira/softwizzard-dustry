import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { MachineContext } from '../../../contexts/MachineProvider/context';

import { ProductContext } from '../../../contexts/ProductProvider/context';
import { MachineProductContext } from '../../../contexts/MachineProductProvider/context';

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

import { listMachine, createMachine, updateMachine } from '../../../contexts/MachineProvider/actions';
import { listProductActive } from '../../../contexts/ProductProvider/actions';
import { cleanMachineProduct , getMachineProduct, createMachineProduct, deleteMachineProduct } from '../../../contexts/MachineProductProvider/actions';
import { Container } from '../styles';

function MachineRegisterPage({formInputs}) {
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
        kw_per_hour: {
            msg: ''
        },
        length: {
            msg: ''
        },
        products: {
            msg: ''
        }
    });

    const [products, setProducts] = useState([]);

    const isMounted = useRef(true);

    const machineContext = useContext(MachineContext);
    const productContext = useContext(ProductContext);
    const machineProductContext = useContext(MachineProductContext);

    const loadData = useCallback(() => {

        // Load the data from the Api

        listMachine(machineContext.dispatch).then((dispatch) =>{
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

        listProductActive(productContext.dispatch).then((dispatch) =>{
            if(isMounted.current){
                dispatch();
            };
        });

        cleanMachineProduct(machineProductContext.dispatch);

        return () => {
            isMounted.current = false;
        }
    },[machineContext.dispatch, productContext.dispatch, machineProductContext.dispatch, navigate]);

    // Load the data when the component is mounted
    useEffect(() => {
        loadData();
    },[loadData]);


    // Capture "AUTOCOMPLET" chosen object and update the values of all inputs ,
    const captureValue = (value) => {
        // Cleans varibles to avoid a conflict 
        setProducts([]);

        setSelected(value);

        setFormData({
            ...formData,
            name: value.name,
            kw_per_hour: value.kw_per_hour,
            length: value.length,
            active: value.active
        });

        getMachineProduct(machineProductContext.dispatch, value['id']);
    }

    // Loads the already saved products to the screen, whenever it reloads
    useEffect(() => {
        for(let i in machineProductContext.state.list){
            setProducts((s) => [
                ...s,
                ...findsByField('id', machineProductContext.state.list[i]['product_id'], productContext.state.list)
            ])
        }
    },[machineProductContext.state.list, productContext.state.list])

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


    // Capture whenever a item is add to the Products' list component and add it
    const handleListAdd = useCallback((value) => {
        setProducts((s) => [...s, value]);
    },[]);

    const handleListDel  = (pk) => {
        setProducts((s) => [...removeById('id', pk , s)]);
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

        const kwMsg = validField(formData.kw_per_hour, 'number');

        setInputHelper((prev) => ({
            ...prev,
            kw_per_hour : {
                msg: kwMsg
            }
        }));

        const lengthMsg = validField(formData.length, 'number');

        setInputHelper((prev) => ({
            ...prev,
            length : {
                msg: lengthMsg
            }
        }));

        const productsMsg = validField(products, 'selector');

        setInputHelper((prev) => ({
            ...prev,
            products : {
                msg: productsMsg
            }
        }));

        if(nameMsg || kwMsg || lengthMsg || productsMsg) return;

        const createProductList = (machineId) => {
            for(let i in products){
                createMachineProduct(machineProductContext.dispatch, machineId, products[i]['id']);
            };
        }

        const update = () => {
            updateMachine(machineContext.dispatch, formData, selected['id']);
            // Drops all established products in the machine and reset them with the callback.
            deleteMachineProduct(selected['id'], true, () => createProductList(selected['id'], products));
        }

        // If one register has been selected, update its values otherwise create a new register
        if(selected){
            update();
        }else{
            createMachine(machineContext.dispatch, formData, createProductList);  
        };
      
        // Wait a while for the user to see the feedback message, then clear the screen
        reloadScreen();
    };

    return (
        <MainFormContainer 
            title={'Cadastro de Máquina'}
            loading={machineContext.state.loading}
        >
            {
                // After an event on this page , shows the feedback message
                machineContext.state.feedback && (
                    <Container>
                        <SnackBarComponent 
                            title={machineContext.state.feedback}
                            type={machineContext.state.error ? 'FAIL' : 'SUCCESS'}
                        />  
                    </Container>
                ) 
            }

            <AutoComplete 
                margin={'0 0 55px 0'}
                title={'Pesquise'} 
                placeholder={'Pesquise'}
                data={machineContext.state.list}
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
                title={'Produtos'}
                data={productContext.state.list} 
                currentItems={products}
                field={'name'}
                handleListAdd={handleListAdd}
                handleListDel={handleListDel}
                validMsg={inputHelper.products && inputHelper.products.msg}
                margin={'0 0 15px 0'}                          
            />
            <Container>
                <GenericButton  
                    text='Gravar' 
                    handleClick={handleClick} 
                    background={'success'}
                />
            </Container>
        </MainFormContainer>
    );
}

export default MachineRegisterPage;
