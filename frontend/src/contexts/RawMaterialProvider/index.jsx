import { useReducer } from "react";
import { data } from "./data";
import { rawMaterialReducer } from "./reducer";
import { RawMaterialContext } from "./context";

export const  RawMaterialProvider = ({children}) => {
    const [state, dispatch] = useReducer(rawMaterialReducer, data);

    return (
        <RawMaterialContext.Provider value={{state, dispatch}}>
            {children}
        </RawMaterialContext.Provider>
    );
};