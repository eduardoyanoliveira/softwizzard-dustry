import { useReducer } from "react";
import { data } from "./data";
import { breakSolutionReducer } from "./reducer";
import { BreakSolutionContext } from "./context";

export const  BreakSolutionProvider = ({children}) => {
    const [state, dispatch] = useReducer(breakSolutionReducer, data);

    return (
        <BreakSolutionContext.Provider value={{state, dispatch}}>
            {children}
        </BreakSolutionContext.Provider>
    );
};