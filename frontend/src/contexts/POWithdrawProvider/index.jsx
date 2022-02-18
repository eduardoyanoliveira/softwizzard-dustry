import { useReducer } from "react";
import { data } from "./data";
import { pOWithdrawReducer } from "./reducer";
import { POWithdrawContext } from "./context";

export const  POWithdrawProvider = ({children}) => {
    const [state, dispatch] = useReducer(pOWithdrawReducer, data);

    return (
        <POWithdrawContext.Provider value={{state, dispatch}}>
            {children}
        </POWithdrawContext.Provider>
    );
};