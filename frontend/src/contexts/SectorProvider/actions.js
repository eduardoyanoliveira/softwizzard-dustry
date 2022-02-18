import * as types from './types';
import { axiosInstance } from '../../axios';

import { findsByField } from '../../Utils/gridMethods';


const urlApi = 'sectors/';

export const cleanState = (dispatch) => {
    dispatch({ type: types.CLEAN_STATE});
};

export const listSector= async(dispatch) => {
 
    dispatch({type: types.LIST_REQUEST});

    const { data } =  await axiosInstance.get(urlApi)
    return () => dispatch({type: types.LIST_SUCCESS, payload: data});
 

};

export const listSectorActive= async(dispatch) => {
 
    dispatch({type: types.LIST_REQUEST});

    let { data } =  await axiosInstance.get(urlApi);

    data = findsByField('active', true, data);

    return () => dispatch({type: types.LIST_SUCCESS_ACTIVE, payload: data});
 

};


export const createSector= async(dispatch, data) => {
   
    await axiosInstance.post(urlApi, data)
    .then((response) => {
        dispatch({ 
            type: types.CREATE_SUCCESS,
            payload: `Setor ""${response.data.name}" cadastrado com sucesso!`
        });
    })
    .catch((error) => {
        dispatch({
            type: types.CREATE_FAIL,
            payload: 'Ocorreu um erro no cadastro'
        });
    });   
};

export const updateSector= async(dispatch, data, pk) => {
    const url = urlApi + `${[pk]}/`;

    axiosInstance.patch(url, data)
                .then((response) => {
                    dispatch({ 
                        type: types.UPDATE_SUCCESS,
                        payload: `Registro do setor "${response.data.name}" alterado com sucesso!`
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: types.UPDATE_FAIL,
                        payload: 'Ocorreu um erro ao gravar as alterações'
                    });
                });   
};


export const deleteSector= async(dispatch, pk, name) => {
    const url = urlApi + `${[pk]}/`;

    axiosInstance.delete(url)
                .then((response) => {
                    dispatch({ 
                        type: types.DELETE_SUCCESS,
                        payload: `Registro do setor "${name}" deletado com sucesso!`
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: types.DELETE_FAIL,
                        payload: 'Ocorreu um erro ao deletar o setor'
                    });
                });   
};
