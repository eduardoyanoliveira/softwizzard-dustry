import * as types from './types';

export const reducer = (state, action) => {
    switch(action.type){
        case types.OPEN: {
            return {...state , open: true};
        }
        case types.CLOSE: {
            return {...state, open: false}
        }
        default:{
            return {...state}
        }
    }

}