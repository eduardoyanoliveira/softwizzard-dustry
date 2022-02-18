import React, { useContext, useRef, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchInput from '../../../components/SearchInput';
import InputPro from '../../../components/InputPro';
import Field from '../../../components/Field';
import SearchCircle from '../../../components/SearchCircle';
import Button from '../../../components/Button';
import ConsultTable from '../../../components/ConsultTable';

import { DimensionsContext } from '../../../contexts/Dimensions/context';

import { MachineContext } from '../../../contexts/MachineProvider/context';
import { OperatorContext } from '../../../contexts/OperatorProvider/context';
import { ProductionOrderContext } from '../../../contexts/ProductionOrderProvider/context';

import { listMachine } from '../../../contexts/MachineProvider/actions';
import { listOperator, getOperator } from '../../../contexts/OperatorProvider/actions';

import { getOpenOrdersByOperator } from '../../../contexts/ProductionOrderProvider/actions';
import { formatDate, reloadScreen } from '../../../Utils/formMethods';
import { axiosInstance } from '../../../axios';
import { findsByField } from '../../../Utils/gridMethods';
import { getUrlParams } from '../../../Utils/urlMethods';
import { BodyContainer, ButtonContainer, Container, HeaderRow, SearchHeader, Wrapper } from './styles';


const columns = [
  {
    id: 0,
    name: 'id',
    desc: 'ID',
    width: 30,
    options: {
      identifier: true,
      order: false,
      center: false,
    }
  },
  {
    id: 1,
    name: 'machine',
    desc: 'Máquina',
    width: 50,
    options: {
      order: false,
      center: false,
    }
  },
  {
    id: 2,
    name: 'start',
    desc: 'Data Cadastro',
    width: 100,
    options: {
      order: false,
    }
  },
  {
    id: 3,
    name: 'end',
    desc: 'Data Encerramento',
    width: 100,
    options: {
      order: false,
    }
  },
];




function ProductionOrderConsultPage() {
  const isMounted = useRef(true);
  const navigate = useNavigate();

  const machineContext = useContext(MachineContext);
  const operatorContext = useContext(OperatorContext);
  const productionOrderContext = useContext(ProductionOrderContext);

  const dimensions = useContext(DimensionsContext);


  const isMobile = (dimensions === 'SMALL' || dimensions === 'MOBILE');
  const isTablet = dimensions === 'TABLET';

  const [formData, setFormData] = useState({
    machine: {},
    operator: {},
    initial_date: '',
    end_date: ''
  });

  const [loadedData, setloadedData] = useState([]);
  
  const loadData = useCallback(() => {

    // Load the data from the Api

    listMachine(machineContext.dispatch).then((dispatch) =>{
      if(isMounted.current){
        dispatch();
      };
    })
    .catch((error) => {
      if(error.response.status === 401){
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
        reloadScreen(10);
      }
    });
    
    if(JSON.parse(localStorage.getItem('is_operator'))){
      getOperator(operatorContext.dispatch, localStorage.getItem('operator_id'));
    }else{
      listOperator(operatorContext.dispatch).then((dispatch) =>{
        if(isMounted.current){
            dispatch();
        };
      });
    }

    return () => {
      isMounted.current = false;
    }
  },[
    machineContext.dispatch,
    operatorContext.dispatch,
    navigate
  ]);

  useEffect(() => {
    loadData();
  },[loadData]);

  const captureMachine = useCallback((value) => {
    setFormData({
        ...formData,
        machine: value
    });
  },[formData]);

  const handleMachineChange = () => {
    setFormData({
        ...formData,
        machine: {}
    });
  };

  const captureOperator = useCallback((value) => {
          
    setFormData({
      ...formData,
      operator: value
    });
  },[formData]);

  const handleOperatorChange = () => {
    setFormData({
      ...formData,
      operator: {}
    });
  };

  const handleChange = (e) => {   
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
  };

  const transformData = useCallback((data) => {
    for(let i in data){
      if(machineContext.state.list.length > 0){
        setloadedData((prev) => [
          ...prev,
          {
            id: data[i].id,
            machine:  [...findsByField('id', data[i].machine_id, machineContext.state.list )][0].name,
            start: formatDate(new Date(data[i].start), false),
            end: data[i].end ? formatDate(new Date(data[i].end), false) : '-',
          }
        ]);
      }
    };
  },[machineContext.state.list]);

  // If the urls params contains the operator's id and the finished with the value false, loads all open orders for that operator
  useEffect(() => {
    if(getUrlParams()){
      if(!getUrlParams().finished){
        getOpenOrdersByOperator(productionOrderContext.dispatch,getUrlParams().operator_id); 
      }
    } 
  },[productionOrderContext.dispatch]);

  // After loading the open orders, put them on the consult table
  useEffect(() => {
    if(productionOrderContext.state.list.length > 0){
      transformData(productionOrderContext.state.list);
    }
  },[transformData, productionOrderContext.state.list])

  const handleLoad = () => {

    setloadedData([]);
    let operator_id; 

    if(JSON.parse(localStorage.getItem('is_operator'))){
      operator_id =  operatorContext.state.list.id
    }else{
      operator_id = formData.operator.id ? formData.operator.id : ''
    }

    const data = {
      machine: formData.machine.id ? formData.machine.id : '',
      operator: operator_id,
      initial_date: formData.initial_date ? new Date(formData.initial_date).toISOString().split('T')[0] : '',
      end_date: formData.end_date ? new Date(formData.end_date).toISOString().split('T')[0] : ''
    }

    axiosInstance.get(`production_orders/?start_date=${data.initial_date}&end_date=${data.end_date}&machine_id=${data.machine}&operator_id=${data.operator}`)
    .then((response) => {
      transformData(response.data);
    }); 
  };

  const handleRowClick = (row) => {
    navigate(`/register/production_orders/?id=${row.id}`);
  }

  return (
    <>
      <SearchHeader isMobile={isMobile}>
        <HeaderRow isMobile={isMobile}>
          <Container isMobile={isMobile} isTablet={isTablet}>
            <SearchInput 
                  title={'Máquina'} 
                  placeholder={'Pesquise'}
                  data={machineContext.state.list}
                  handleChangeFather={handleMachineChange}
                  field={'name'} 
                  captureValue={captureMachine}
                  value={formData.machine && formData.machine.name}
                  pro={true}
              />
              <Wrapper/>
              {
                JSON.parse(localStorage.getItem('is_operator')) ? (
                  <Field
                    title={'Operador'}
                    value={operatorContext.state.list.length !== 0 && operatorContext.state.list.name}
                  />
                )
                :
                (
                  <SearchInput 
                    title={'Operador'} 
                    placeholder={'Pesquise'}
                    data={operatorContext.state.list}
                    handleChangeFather={handleOperatorChange}
                    field={'name'} 
                    captureValue={captureOperator}
                    value={formData.operator && formData.operator.name}
                    pro={true}
                    maxWidth={isTablet && '100%'}
                  />
                )
              }
          </Container>
          {
            !isTablet && (
              <Wrapper />
            )
          }
          <Container isMobile={isMobile} isTablet={isTablet}>
            <InputPro 
              title={'Data Inicial'} 
              value={formData.initial_date && formData.initial_date}
              inputType={'date'}
              maxWidth={isTablet ? '90%' : '520px'}
              name={'initial_date'}
              handleChange={handleChange}
            />
            <Wrapper />
            <InputPro 
              title={'Data Final'} 
              value={formData.end_date && formData.end_date}
              inputType={'date'}
              maxWidth={isTablet ? '90%' : '520px'}
              name={'end_date'}
              handleChange={handleChange}
            />
          </Container>
          {
            !isTablet && (
              <Wrapper />
            )
          }
          <ButtonContainer isMobile={isMobile}>
            {
              isMobile ? (
                <Button
                  text={'Pesquise'}
                  handleClick={handleLoad}
                  maxwidth={'520px'}
                  background={'primary'}
                />
              )
              :
              (
                <SearchCircle  
                  handleClick={handleLoad} 
                />
              )
            }
          </ButtonContainer>
        </HeaderRow>
      </SearchHeader>
      <BodyContainer>
        <ConsultTable
          columns={columns}
          data={loadedData}
          id={'consult-table'} 
          handleRowClick={handleRowClick}
        />
      </BodyContainer>
    </>
  );
}

export default ProductionOrderConsultPage;
