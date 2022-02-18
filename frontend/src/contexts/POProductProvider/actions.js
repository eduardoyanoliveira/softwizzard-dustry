import * as types from './types';
import { axiosInstance } from '../../axios';

const urlApi = 'production_order_products/';

export const cleanPOProduct = async(dispatch) => {
    dispatch({type: types.CLEAN_STATE})
}

export const listPOProducts= async(dispatch) => {
 
    dispatch({type: types.LIST_REQUEST});

    const { data } =  await axiosInstance.get(urlApi)
    return () => dispatch({type: types.LIST_SUCCESS, payload: data});

};

export const getPOProduct= async(dispatch, id) => {
 
    dispatch({type: types.RETRIVE_REQUEST});

    let { data } =  await axiosInstance.get(urlApi + `${id}/`);
    dispatch({type: types.RETRIVE_SUCCESS, payload: data});
};


export const createPOProduct = async(dispatch, order, product) => {
    const url = urlApi + `?order=${order}&product=${product}`;

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


export const deletePOProduct = async(pk, all = false) => {
    const params = all  ? `?all=true` : '';
    const url = urlApi + `${[pk]}/` + params;

    return await axiosInstance.delete(url);
};
