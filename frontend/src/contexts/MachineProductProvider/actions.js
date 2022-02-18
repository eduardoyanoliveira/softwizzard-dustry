import * as types from './types';
import { axiosInstance } from '../../axios';

const urlApi = 'machine_products/';

export const cleanMachineProduct = async(dispatch) => {
    dispatch({type: types.CLEAN_STATE})
}

export const listMachineProduct= async(dispatch) => {
 
    dispatch({type: types.LIST_REQUEST});

    const { data } =  await axiosInstance.get(urlApi)
    return () => dispatch({type: types.LIST_SUCCESS, payload: data});
 

};

export const getMachineProduct= async(dispatch, id) => {
 
    dispatch({type: types.RETRIVE_REQUEST});

    let { data } =  await axiosInstance.get(urlApi + `${id}/`);
    dispatch({type: types.RETRIVE_SUCCESS, payload: data});
};


export const createMachineProduct= async(dispatch, operator, sector) => {
    const url = urlApi + `?machine=${operator}&product=${sector}`;
    await axiosInstance.post(url)
    .then((response) => {
        dispatch({ 
            type: types.CREATE_SUCCESS,
        });
    })
    .catch((error) => {
        dispatch({
            type: types.CREATE_FAIL,
            payload: 'Ocorreu um erro no cadastro'
        });
    });   
};


export const deleteMachineProduct= async(pk, all = false, callback) => {
    const params = all  ? `?all=true` : '';
    const url = urlApi + `${[pk]}/` + params;

    return await axiosInstance.delete(url)
    .then((response) => {
        callback();
    })
    .catch((error) => {
        console.log(error)
        callback();
    }); 
};
