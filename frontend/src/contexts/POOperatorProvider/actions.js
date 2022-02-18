import * as types from './types';
import { axiosInstance } from '../../axios';

const urlApi = 'production_order_operators/';

export const cleanPOOperator = async(dispatch) => {
    dispatch({type: types.CLEAN_STATE})
}

export const listPOOperators= async(dispatch) => {
 
    dispatch({type: types.LIST_REQUEST});

    const { data } =  await axiosInstance.get(urlApi)
    return () => dispatch({type: types.LIST_SUCCESS, payload: data});

};

export const getPOOperator= async(dispatch, id, callback) => {
 
    dispatch({type: types.RETRIVE_REQUEST});

    await axiosInstance.get(urlApi + `${id}/`).then(({data}) => {
        dispatch({type: types.RETRIVE_SUCCESS, payload: data});
        callback && callback(data);
    });
    
};

export const getByOperator = async(dispatch, operator) => {

    const url = urlApi + `0/?operator=${operator}`;
    dispatch({type: types.RETRIVE_REQUEST});

    let { data } =  await axiosInstance.get(url);
    dispatch({type: types.RETRIVE_SUCCESS, payload: data});
};

export const createPOOperator = async(dispatch, order, operator) => {
    const url = urlApi + `?order=${order}&operator=${operator}`;

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


export const deletePOOperator = async(pk, all = false) => {
    const params = all  ? `?all=true` : '';
    const url = urlApi + `${[pk]}/` + params;

    return await axiosInstance.delete(url);
};
