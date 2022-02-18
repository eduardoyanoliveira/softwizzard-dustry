import * as types from './types';
import { axiosInstance } from '../../axios';

import { findsByField } from '../../Utils/gridMethods';


const urlApi = 'raw_materials/';

export const cleanState = (dispatch) => {
    dispatch({ type: types.CLEAN_STATE});
};

export const listRawMaterial= async(dispatch) => {
 
    dispatch({type: types.LIST_REQUEST});

    const { data } =  await axiosInstance.get(urlApi)
    return () => dispatch({type: types.LIST_SUCCESS, payload: data});
 

};

export const listRawMaterialActive= async(dispatch) => {
 
    dispatch({type: types.LIST_REQUEST});

    let { data } =  await axiosInstance.get(urlApi);

    data = findsByField('active', true, data);

    return () => dispatch({type: types.LIST_SUCCESS_ACTIVE, payload: data});
 

};


export const createRawMaterial= async(dispatch, data) => {
   
    await axiosInstance.post(urlApi, data)
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

export const updateRawMaterial= async(dispatch, data, pk) => {
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


export const deleteRawMaterial= async(dispatch, pk, name) => {
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
