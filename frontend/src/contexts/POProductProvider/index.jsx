import { useReducer } from "react";
import { data } from "./data";
import { pOProductReducer } from "./reducer";
import { POProductContext } from "./context";

export const  POProductProvider = ({children}) => {
    const [state, dispatch] = useReducer(pOProductReducer, data);

    return (
        <POProductContext.Provider value={{state, dispatch}}>
            {children}
        </POProductContext.Provider>
    );
};