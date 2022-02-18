import * as types from './types';
import { axiosInstance } from '../../axios';

const urlApi = 'production_order_events/';

export const cleanPOEvent = (dispatch) => {
    dispatch({ type: types.CLEAN_STATE});
};

export const listPOEvent = async(dispatch, id) => {
 
    dispatch({type: types.LIST_REQUEST});

    const { data } =  await axiosInstance.get(urlApi + `${id}/`);

    dispatch({type: types.LIST_SUCCESS, payload: data});

};

export const createPOEvent = async(data) => {
    await axiosInstance.post(urlApi, data);
};

export const updatePOEvent= async(dispatch, data, pk) => {
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


export const deletePOEvent= async(dispatch, pk, name) => {
    const url = urlApi + `${[pk]}/`;

    axiosInstance.delete(url)
                .then((response) => {
                    dispatch({ 
                        type: types.UPDATE_SUCCESS,
                        payload: {
                           feedback: `Registro  "${name}" deletado com sucesso!`
                        }
                    });
                })
                .catch((error) => {
                    dispatch({
                        type: types.UPDATE_FAIL,
                        payload: {
                          feedback:  'Ocorreu um erro ao deletar o registro'
                        }
                    });
                });   
};

