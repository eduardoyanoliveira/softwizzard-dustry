import * as types from './types';

export const machineReducer = (state, action) => {
    switch(action.type){
        case types.LIST_REQUEST:{
            return {...state, loading: true, error: false, message: '', feedback: ''};
        }
        case types.LIST_SUCCESS:{
            return {...state, loading: false, error: false ,list: action.payload, message: ''}
        }
        case types.CREATE_SUCCESS:{
            return {...state, loading: false , error: false, feedback: action.payload.feedback, response: action.payload.response}
        }
        case types.CREATE_FAIL:{
            return {...state, loading: false, error: true, feedback: action.payload.feedback}
        }
        case types.UPDATE_SUCCESS:{
            return {...state, loading: false , error: false, feedback: action.payload.feedback}
        }
        case types.UPDATE_FAIL:{
            return {...state, loading: false, error: true, feedback: action.payload.feedback}
        }
        case types.DELETE_SUCCESS:{
            return {...state, loading: false , error: false, feedback: action.payload.feedback, response: action.payload.response }
        }
        case types.DELETE_FAIL:{
            return {...state, loading: false, error: true, feedback: action.payload.feedback}
        }
        default:{
            return {...state}
        }
    }
};