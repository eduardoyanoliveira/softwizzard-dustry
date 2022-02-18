import * as types from './types';
import { axiosInstance } from '../../axios';
import { findsByField } from '../../Utils/gridMethods';

const urlApi = 'production_orders/';

export const cleanState = (dispatch) => {
    dispatch({ type: types.CLEAN_STATE});
};

export const listProductionOrder= async(dispatch) => {
 
    dispatch({type: types.LIST_REQUEST});

    let  {data} = await axiosInstance.get(urlApi);

    if(JSON.parse(localStorage.getItem('is_operator'))) data = findsByField('end', null, data);
   
    return () => dispatch({type: types.LIST_SUCCESS, payload: data});

};

export const filterProductionOrder= async(dispatch, initial_date, end_date, machine_id, operator_id) => {
 
    dispatch({type: types.LIST_REQUEST});

    const url = `production_orders/?start_date=${initial_date}&end_date=${end_date}&machine_id=${machine_id}&operator_id=${operator_id}`;

    let  {data} = await axiosInstance.get(url);

    dispatch({type: types.LIST_SUCCESS, payload: data});

};

export const getOpenOrdersByOperator = async(dispatch, operator_id) => {

    dispatch({type: types.LIST_REQUEST});

    const url = `production_orders/?start_date=&end_date=&machine_id=&operator_id=${operator_id}`;

    let  {data} = await axiosInstance.get(url);

    data = findsByField('end', null, data);

    dispatch({type: types.LIST_SUCCESS, payload: data});

   
}

export const createProductionOrder= async(data) => {
   
    return await axiosInstance.post(urlApi, data);
    
};

export const updateProductionOrder= async(dispatch, data, pk) => {
    const url = urlApi + `${[pk]}/`;

    axiosInstance.patch(url, data)
    .then((response) => {
        dispatch({ 
            type: types.UPDATE_SUCCESS,
            payload: `Registro  "${response.data.name}" alterado com sucesso!`
        });
    })
    .catch((error) => {
        dispatch({
            type: types.UPDATE_FAIL,
            payload: 'Ocorreu um erro ao gravar as alterações'
        });
    });   
};


export const deleteProductionOrder= async(dispatch, pk, name) => {
    const url = urlApi + `${[pk]}/`;

    axiosInstance.delete(url)
    .then((response) => {
        dispatch({ 
            type: types.DELETE_SUCCESS,
            payload: `Registro  "${name}" deletado com sucesso!`
        });
    })
    .catch((error) => {
        dispatch({
            type: types.DELETE_FAIL,
            payload: 'Ocorreu um erro ao deletar o registro'
        });
    });   
};
