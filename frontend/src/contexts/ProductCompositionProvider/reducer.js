import * as types from './types';

export const productCompositionReducer = (state, action) => {
    switch(action.type){
        case types.CLEAN_STATE:{
            return {...state, loading: false, error: false, feedback: ''}
        }
        case types.LIST_REQUEST:{
            return {...state, loading: true, error: false, feedback: ''};
        }
        case types.LIST_SUCCESS:{
            return {...state, loading: false, error: false ,list: action.payload, feedback: ''}
        }
        case types.CREATE_SUCCESS:{
            return {...state, loading: false , error: false, feedback: action.payload.feedback}
        }
        case types.CREATE_FAIL:{
            return {...state, loading: false, error: true, feedback: action.payload.feedback}
        }
        case types.UPDATE_SUCCESS:{
            return {...state, loading: false , error: false, feedback: action.payload}
        }
        case types.UPDATE_FAIL:{
            return {...state, loading: false, error: true, feedback: action.payload}
        }
        case types.DELETE_SUCCESS:{
            return {...state, loading: false , error: false, feedback: action.payload}
        }
        case types.DELETE_FAIL:{
            return {...state, loading: false, error: true, feedback: action.payload}
        }
        default:{
            return {...state}
        }
    }
};