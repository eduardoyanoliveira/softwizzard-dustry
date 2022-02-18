import * as types from './types';
import { axiosInstance } from '../../axios';

const urlApi = 'operator_sectors/';

export const cleanOperatorSector = async(dispatch) => {
    dispatch({type: types.CLEAN_STATE})
}

export const listOperatorSectors= async(dispatch) => {
 
    dispatch({type: types.LIST_REQUEST});

    const { data } =  await axiosInstance.get(urlApi)
    return () => dispatch({type: types.LIST_SUCCESS, payload: data});

};

export const getOperatorSectors= async(dispatch, id) => {
 
    dispatch({type: types.RETRIVE_REQUEST});

    let { data } =  await axiosInstance.get(urlApi + `${id}/`);
    dispatch({type: types.RETRIVE_SUCCESS, payload: data});
};


export const createOperatorSector = async(dispatch, operator, sector) => {
    const url = urlApi + `?operator=${operator}&sector=${sector}`;

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


export const deleteOperatorSector = async(pk, all = false, callback) => {
    const params = all  ? `?all=true` : '';
    const url = urlApi + `${[pk]}/` + params;

    return await axiosInstance.delete(url)
    .then((response) => {
        callback();
    })
    .catch((error) => {
        callback();
    }); 
};
