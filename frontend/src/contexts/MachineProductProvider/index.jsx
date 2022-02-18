import { useReducer } from "react";
import { data } from "./data";
import { machineProductReducer } from "./reducer";
import { MachineProductContext } from "./context";

export const  MachineProductProvider = ({children}) => {
    const [state, dispatch] = useReducer(machineProductReducer, data);

    return (
        <MachineProductContext.Provider value={{state, dispatch}}>
            {children}
        </MachineProductContext.Provider>
    );
};