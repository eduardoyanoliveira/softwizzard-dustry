import * as types from './types';
import { axiosInstance } from '../../axios';

import { findsByField } from '../../Utils/gridMethods';


const urlApi = 'products/';

export const cleanState = (dispatch) => {
    dispatch({ type: types.CLEAN_STATE});
};

export const listProduct= async(dispatch) => {
 
    dispatch({type: types.LIST_REQUEST});

    const { data } =  await axiosInstance.get(urlApi)
    return () => dispatch({type: types.LIST_SUCCESS, payload: data});
};

export const listProductActive= async(dispatch) => {
 
    dispatch({type: types.LIST_REQUEST});

    let { data } =  await axiosInstance.get(urlApi);

    data = findsByField('active', true, data);

    return () => dispatch({type: types.LIST_SUCCESS_ACTIVE, payload: data});
};


export const createProduct= async(dispatch, data, callback) => {
   
  await axiosInstance.post(urlApi, data)
  .then((response) => {
    dispatch({ 
        type: types.CREATE_SUCCESS,
        payload: {
            feedback: `Registro "${response.data.name}" cadastrado com sucesso!`,
            response: response
        }
    });
    callback(response.data.id);
    }).catch(() =>{
        dispatch({
            type: types.CREATE_FAIL,
            payload: {
                feedback: 'Ocorreu um erro no cadastro'
            }
        });
    });            ;
};

export const updateProduct= async(dispatch, data, pk) => {
    const url = urlApi + `${[pk]}/`;

    axiosInstance.patch(url, data)
                .then((response) => {
                    dispatch({ 
                        type: types.UPDATE_SUCCESS,
                        payload: { feedback: `Registro  "${response.data.name}" alterado com sucesso!` }
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: types.UPDATE_FAIL,
                        payload: {feedback: 'Ocorreu um erro ao gravar as alterações' }
                    });
                });   
};


export const deleteProduct= async(dispatch, pk, name) => {
    const url = urlApi + `${[pk]}/`;

    axiosInstance.delete(url)
                .then((response) => {
                    dispatch({ 
                        type: types.DELETE_SUCCESS,
                        payload: {feedback: `Registro  "${name}" deletado com sucesso!` }
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: types.DELETE_FAIL,
                        payload: {feedback: 'Ocorreu um erro ao deletar o registro'}
                    });
                });   
};
