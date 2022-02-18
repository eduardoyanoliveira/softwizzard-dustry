import * as types from './types';
import { axiosInstance } from '../../axios';

const urlApi = 'products_composition/';

export const cleanProductComposition = (dispatch) => {
    dispatch({ type: types.CLEAN_STATE});
};

export const listProductComposition= async(dispatch, id) => {
 
    dispatch({type: types.LIST_REQUEST});

    const { data } =  await axiosInstance.get(urlApi + `${id}/`);
    dispatch({type: types.LIST_SUCCESS, payload: data});

};

export const createProductComposition = async(dispatch, product, raw_material, qty) => {
    const url = urlApi + `?product=${product}&raw_material=${raw_material}&qty=${qty}`;
    await axiosInstance.post(url)
    .then((response) => {
        dispatch({ 
            type: types.CREATE_SUCCESS,
            payload: `"${response.data.name}" cadastrado com sucesso!`
        });
    })
    .catch((error) => {
        dispatch({
            type: types.CREATE_FAIL,
            payload: 'Ocorreu um erro no cadastro'
        });
    });   
};

export const updateProductComposition= async(dispatch, data, pk) => {
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


export const deleteProductComposition = async( pk, all, callback) => {
    const params = all  ? `?all=true` : '';
    const url = urlApi + `${[pk]}/` + params;

    await axiosInstance.delete(url)
    .then((response) => {
        // After deleting reestablished acording to the user selection
        callback();
    })
    .catch((error) => {
        console.log(error)
        // After deleting reestablished acording to the user selection
        callback();
    });
};
