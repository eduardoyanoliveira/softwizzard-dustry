import { useReducer } from "react";
import { data } from "./data";
import { breakReasonReducer } from "./reducer";
import { BreakReasonContext } from "./context";

export const  BreakReasonProvider = ({children}) => {
    const [state, dispatch] = useReducer(breakReasonReducer, data);

    return (
        <BreakReasonContext.Provider value={{state, dispatch}}>
            {children}
        </BreakReasonContext.Provider>
    );
};