import { useReducer } from "react";
import { data } from "./data";
import { pOOperatorReducer } from "./reducer";
import { POOperatorContext } from "./context";

export const  POOperatorProvider = ({children}) => {
    const [state, dispatch] = useReducer(pOOperatorReducer, data);

    return (
        <POOperatorContext.Provider value={{state, dispatch}}>
            {children}
        </POOperatorContext.Provider>
    );
};