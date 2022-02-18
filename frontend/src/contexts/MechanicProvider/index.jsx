import { useReducer } from "react";
import { data } from "./data";
import { mechanicReducer } from "./reducer";
import { MechanicContext } from "./context";

export const  MechanicProvider = ({children}) => {
    const [state, dispatch] = useReducer(mechanicReducer, data);

    return (
        <MechanicContext.Provider value={{state, dispatch}}>
            {children}
        </MechanicContext.Provider>
    );
};