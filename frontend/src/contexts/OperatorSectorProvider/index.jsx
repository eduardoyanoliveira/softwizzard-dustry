import { useReducer } from "react";
import { data } from "./data";
import { operatorSectorReducer } from "./reducer";
import { OperatorSectorContext } from "./context";

export const  OperatorSectorProvider = ({children}) => {
    const [state, dispatch] = useReducer(operatorSectorReducer, data);

    return (
        <OperatorSectorContext.Provider value={{state, dispatch}}>
            {children}
        </OperatorSectorContext.Provider>
    );
};