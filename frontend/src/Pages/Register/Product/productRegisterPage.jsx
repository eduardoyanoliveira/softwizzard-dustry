import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductContext } from '../../../contexts/ProductProvider/context';
import { RawMaterialContext } from '../../../contexts/RawMaterialProvider/context';
import { ProductCompositionContext } from '../../../contexts/ProductCompositionProvider/context';
import { DepartmentContext } from '../../../contexts/DepartmentsProvider/context'; 

import MainFormContainer from '../../../components/MainFormContainer';
import AutoComplete from '../../../components/AutoComplete';
import InputPro from '../../../components/InputPro';
import GenericButton from '../../../components/Button';
import SnackBarComponent from '../../../components/SnackBar';
import ActiveLabelComponent from '../../../components/ActiveLabel';
import TableList from '../../../components/TableList';

import { validField } from '../../../Utils/inputValidations';
import { reloadScreen, arrayToState } from '../../../Utils/formMethods';
import { findsByField, tableToJson } from '../../../Utils/gridMethods';

import { listProduct, updateProduct, createProduct } from '../../../contexts/ProductProvider/actions';
import { listRawMaterialActive } from '../../../contexts/RawMaterialProvider/actions';
import {listDepartment } from '../../../contexts/DepartmentsProvider/actions';
import { cleanProductComposition, createProductComposition, listProductComposition, deleteProductComposition } from '../../../contexts/ProductCompositionProvider/actions';
import { Container } from '../styles';

// The structure of the columns on the compostion tableList component
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
        name: 'raw_material_id',
        desc: 'Código Matéria Prima',
        width: 70,
        identifier: true,
        options: {
            order: false,
        },
    },
    {
        id: 2,
        name: 'name',
        desc: 'Matéria Prima',
        width: 170,
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
    },
];

const tableId = 'table';

function ProductRegisterPage({formInputs}) {
    const navigate = useNavigate();
    // If the user selects a register to modify , it will be load to this state
    const [selected, setSelected] = useState(null);

    const inputs = arrayToState(formInputs);  
    const [formData, setFormData] = useState({
        inputs,
        department : null
    });

    const [inputHelper, setInputHelper] = useState({
        name: {
            msg: ''
        },
        weight: {
            msg: ''
        },
        department: {
            msg: ''
        },
        composition: {
            msg: ''
        }
    });


    // Turns the compositonList in a list that matches the "columns" declaration
    const [ decodedList, setDecodedList] = useState([]);

    const isMounted = useRef(true);

    const productContext = useContext(ProductContext);
    const rawMaterialContext = useContext(RawMaterialContext);
    const departmentContext = useContext(DepartmentContext);
    const productCompositionContext = useContext(ProductCompositionContext);

    const loadData = useCallback(() => {

        // Load the data from the Api

        listProduct(productContext.dispatch).then((dispatch) =>{
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

        listRawMaterialActive(rawMaterialContext.dispatch).then((dispatch) =>{
            if(isMounted.current){
                dispatch();
            };
        });

        listDepartment(departmentContext.dispatch).then((dispatch) => {
            if(isMounted.current){
                dispatch();
            }
        });

        cleanProductComposition(productCompositionContext.dispatch);

        return () => {
            isMounted.current = false;
        }
    },[productContext.dispatch, rawMaterialContext.dispatch, departmentContext.dispatch, productCompositionContext.dispatch, navigate]);

    // Load the data when the component is mounted
    useEffect(() => {
        loadData();
    },[loadData]);

    // Cleans the screen varibles
    const cleanVaribles = () => {
        setDecodedList([]);
    }

    // Capture "AUTOCOMPLET" chosen object and update the values of all inputs ,
    const captureProduct = (value) => {
        // Cleans all varibles to avoid a conflict 
        cleanVaribles();
        setSelected(value);

        setFormData({
            ...formData,
            name: value.name,
            weight: value.weight,
            department: findsByField('id', value['department_id'], departmentContext.state.list)[0],
            active: value.active
        });

        listProductComposition(productCompositionContext.dispatch, value['id']);
    }


    const decode = useCallback((list) => {

        for(let i in list){
            setDecodedList((prev) => (
                [...prev, 
                    {
                        id: Number(i) + 1,
                        raw_material_id: list[i]['raw_material_id'],
                        name: [...findsByField('id', list[i]['raw_material_id'], rawMaterialContext.state.list)][0]['name'],
                        quantity: list[i]['qty'],
                        deletable: true
                    }
                ]
            ));

        }
    },[rawMaterialContext.state.list])

    // for each register already present on product composition, it decodes the register and save on the decode state
    // This action have to be executed in order to the compostion tableList be able to render the current registers
    useEffect(() => {
        const compositionList = [ ...productCompositionContext.state.list];

        decode(compositionList);

    },[productCompositionContext.state.list, rawMaterialContext.state.list, decode]);

    // Capture the chosen department on the AUTOCOMPLENTE Department
    const captureDepartment = useCallback((value) => {
        setFormData({
            ...formData,
            department: value
        });
    },[formData])

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

        const tableData = document.getElementById(tableId) && tableToJson(document.getElementById(tableId), columns);
        const composition = [];
        for(let i in tableData){
          
            composition.push(  
                {
                    id: tableData[i].raw_material_id,
                    quantity: tableData[i].quantity
                }
            );
        }

        // Required Validations
        const nameMsg = validField(formData.name, 'text');

        setInputHelper((prev) => ({
            ...prev,
            name : {
                msg: nameMsg
            }
        }));

        const weightMsg = validField(formData.weight, 'number');

        setInputHelper((prev) => ({
            ...prev,
            weight : {
                msg: weightMsg
            }
        }));

        const departmentMsg = validField(formData.department, 'required');

        setInputHelper((prev) => ({
            ...prev,
            department : {
                msg: departmentMsg
            }
        }));

        const compositionMsg = validField(composition, 'selector');

        setInputHelper((prev) => ({
            ...prev,
            composition : {
                msg: compositionMsg
            }
        }));

        if(nameMsg || weightMsg || departmentMsg || compositionMsg) return;


        // Data to create or updata a register
        const data = {
            // If the user is creating a new register, sets 'ACTIVE' to true, else update with new state changed by the user
            active: formData.active,
            name: formData.name,
            weight: formData.weight,
            department_id: formData.department.id
        };

        const createComposiotion = (productId) => {
            for(let i in composition){
                createProductComposition(productCompositionContext.dispatch, productId, composition[i]['id'], composition[i]['quantity']);
            };
        }

        const update = () => {
            updateProduct(productContext.dispatch, data, selected['id']);
            // Drops all established raw materials with the and product , before reset them.
            deleteProductComposition(selected['id'], true, () => createComposiotion(selected['id']));
        }

        // If one operator has been selected, update its values otherwise create a new operator
        if(selected){
            update();
        }else{
            createProduct(productContext.dispatch, data, createComposiotion);  
        };
        // Wait a while for the user to see the feedback message, then clear the screen
        reloadScreen();
    };

    return (
        <MainFormContainer
            title={'Cadastro de Produto'}
            loading={productContext.state.loading}
        >
            <AutoComplete 
                margin={'0 0 55px 0'}
                title={'Pesquise'} 
                placeholder={'Pesquise'}
                data={productContext.state.list}
                field={'name'} 
                captureValue={captureProduct}
                handleChangeFather={handleSearchChange}
                pro={true}
                checkbox={true}
            />
            {
                selected && (
                    <Container style={{marginTop: '7px'}}>
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
            <AutoComplete 
                margin={'0 0 15px 0'}
                title={'Departamento'} 
                placeholder={'Nome do Departamento'}
                data={departmentContext.state.list}
                field={'name'} 
                captureValue={captureDepartment}
                value={formData.department && formData.department.name}
                pro={true}
                validMsg={inputHelper.department.msg}
            />
            <TableList 
                title={'Ficha Técnica'}
                columns={columns} 
                data={decodedList} 
                tableId={tableId}
                unique={true}
                field={'raw_material_id'}
                searchData={rawMaterialContext.state.list}
                validMsg={inputHelper.composition.msg}
                margin={'0 0 15px 0'}
            />
            {
                //After an event on this page , shows the feedback message
                productContext.state.feedback && (
                    <Container style={{marginTop: '7px'}}>
                        <SnackBarComponent 
                            title={productContext.state.feedback}
                            type={productContext.state.error ? 'FAIL' : 'SUCCESS'}
                        />  
                    </Container>
                ) 
            }
            <Container style={{marginTop: '7px'}}>
                    <GenericButton  
                        text='Gravar' 
                        handleClick={handleClick} 
                        background={'success'}
                    />
            </Container>
        </MainFormContainer>
    )
}

export default ProductRegisterPage;
