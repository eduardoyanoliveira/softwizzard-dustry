import * as types from './types';
import { axiosInstance } from '../../axios';
import { findsByField } from '../../Utils/gridMethods';


const urlApi = 'operators/';

export const listOperator = async(dispatch) => {
 
    dispatch({type: types.LIST_REQUEST});

    const { data } =  await axiosInstance.get(urlApi)
    return () => dispatch({type: types.LIST_SUCCESS, payload: data});
 

};

export const listOperatorActive= async(dispatch) => {
 
    dispatch({type: types.LIST_REQUEST});

    let { data } =  await axiosInstance.get(urlApi);

    data = findsByField('active', true, data);

    return () => dispatch({type: types.LIST_SUCCESS, payload: data});
 
};

export const getOperator = async(dispatch, pk) => {
    const url =  `${urlApi}${[pk]}/`;

    dispatch({type: types.LIST_REQUEST});

    let { data } =  await axiosInstance.get(url);

    dispatch({type: types.LIST_SUCCESS, payload: data});
}; 

export const createOperator = async(dispatch, data, callback) => {
    
    await axiosInstance.post(urlApi, data).then((response) => {
        dispatch({ 
            type: types.CREATE_SUCCESS,
            payload: {
                feedback: `Operador ""${response.data.name}" cadastrado com sucesso!`,
                response: response
            }
        });
        callback(response.data['id']);
    }).catch(() =>{
        dispatch({
            type: types.CREATE_FAIL,
            payload: {
                feedback: 'Ocorreu um erro no cadastro'
            }
        });
    });            ;
};

export const updateOperator = async(dispatch, data, pk) => {
    const url = urlApi + `${[pk]}/`;

    axiosInstance.patch(url, data)
    .then((response) => {
        dispatch({ 
            type: types.UPDATE_SUCCESS,
            payload: {
                feedback: `Registro do operador "${response.data.name}" alterado com sucesso!`
            }
        });
    })
    .catch((error) => {
        dispatch({
            type: types.UPDATE_FAIL,
            payload: {
                feedback: 'Ocorreu um erro ao gravar as alterações'
            }
        });
    });   
};


export const deleteOperator = async(dispatch, pk, name) => {
    const url = urlApi + `${[pk]}/`;

    axiosInstance.delete(url)
                .then((response) => {
                    dispatch({ 
                        type: types.UPDATE_SUCCESS,
                        payload: {
                           feedback: `Registro do operador "${name}" deletado com sucesso!`
                        }
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: types.UPDATE_FAIL,
                        payload: {
                          feedback:  'Ocorreu um erro ao deletar o operador'
                        }
                    });
                });   
};
