import { useReducer } from "react";
import { data } from "./data";
import { machineReducer } from "./reducer";
import { MachineContext } from "./context";

export const  MachineProvider = ({children}) => {
    const [state, dispatch] = useReducer(machineReducer, data);

    return (
        <MachineContext.Provider value={{state, dispatch}}>
            {children}
        </MachineContext.Provider>
    );
};