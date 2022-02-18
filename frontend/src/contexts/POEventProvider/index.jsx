import { useReducer } from "react";
import { data } from "./data";
import { pOEventReducer } from "./reducer";
import { POEventContext } from "./context";

export const  POEventProvider = ({children}) => {
    const [state, dispatch] = useReducer(pOEventReducer, data);

    return (
        <POEventContext.Provider value={{state, dispatch}}>
            {children}
        </POEventContext.Provider>
    );
};