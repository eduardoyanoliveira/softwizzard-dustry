import { useReducer } from "react";
import { data } from "./data";
import { operatorReducer } from "./reducer";
import { OperatorContext } from "./context";

export const  OperatorProvider = ({children}) => {
    const [state, dispatch] = useReducer(operatorReducer, data);

    return (
        <OperatorContext.Provider value={{state, dispatch}}>
            {children}
        </OperatorContext.Provider>
    );
};