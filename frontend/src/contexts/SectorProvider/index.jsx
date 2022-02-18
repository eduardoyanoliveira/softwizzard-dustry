import { useReducer } from "react";
import { data } from "./data";
import { sectorReducer } from "./reducer";
import { SectorContext } from "./context";

export const  SectorProvider = ({children}) => {
    const [state, dispatch] = useReducer(sectorReducer, data);

    return (
        <SectorContext.Provider value={{state, dispatch}}>
            {children}
        </SectorContext.Provider>
    );
};