import * as types from './types';
import { axiosInstance } from '../../axios';

const urlApi = 'production_order_withdrawals/';

export const cleanPOWithdraw = (dispatch) => {
    dispatch({ type: types.CLEAN_STATE});
};

export const listPOWithdraw = async(dispatch, id) => {
 
    dispatch({type: types.LIST_REQUEST});

    const { data } =  await axiosInstance.get(urlApi + `${id}/`);
    dispatch({type: types.LIST_SUCCESS, payload: data});

};

export const createPOWithdraw = (dispatch, order, product, qty) => {
    const url = urlApi + `?order=${order}&product=${product}&qty=${qty}`;
    axiosInstance.post(url)
    .then((response) => {
        dispatch({ 
            type: types.CREATE_SUCCESS,
            payload: `"sucesso!`
        });
    })
    .catch((error) => {
        dispatch({
            type: types.CREATE_FAIL,
            payload: 'Ocorreu um erro no cadastro'
        });
    });   
};

export const updatePOWithdraw= async(dispatch, data, pk) => {
    const url = urlApi + `${[pk]}/`;

    await axiosInstance.patch(url, data)
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


export const deletePOWithdraw = ( pk, all) => {
    const params = all  ? `?all=true` : '';
    const url = urlApi + `${[pk]}/` + params;

    return  axiosInstance.delete(url);
};
