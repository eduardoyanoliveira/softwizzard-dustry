import * as types from './types';
import { axiosInstance } from '../../axios';
import { findsByField } from '../../Utils/gridMethods';


const urlApi = 'users/custom_user/';


export const listUser= async(dispatch) => {
 
    dispatch({type: types.LIST_REQUEST});

    const  {data} = await axiosInstance.get(urlApi);

    return () => dispatch({type: types.LIST_SUCCESS, payload: data});

};

export const listUserActive= async(dispatch) => {
 
    dispatch({type: types.LIST_REQUEST});

    let { data } =  await axiosInstance.get(urlApi);

    data = findsByField('is_active', true, data);

    return () => dispatch({type: types.LIST_SUCCESS_ACTIVE, payload: data});
 
};


export const createUser = async(dispatch, data) => {
   
    await axiosInstance.post(urlApi, data)
    .then((response) => {
        dispatch({ 
            type: types.CREATE_SUCCESS,
            payload: `"${response.data.user_name}" cadastrado com sucesso!`
        });
    })
    .catch((error) => {
        dispatch({
            type: types.CREATE_FAIL,
            payload: 'Ocorreu um erro no cadastro'
        });
    });   
};

export const updateUser = async(dispatch, data, pk) => {
    const url = urlApi + `${[pk]}/`;

    axiosInstance.patch(url, data)
                .then((response) => {
                    dispatch({ 
                        type: types.UPDATE_SUCCESS,
                        payload: `Registro  "${response.data.user_name}" alterado com sucesso!`
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: types.UPDATE_FAIL,
                        payload: 'Ocorreu um erro ao gravar as alterações'
                    });
                });   
};


export const deleteUser= async(dispatch, pk, name) => {
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
