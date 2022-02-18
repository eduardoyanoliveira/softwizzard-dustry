import { useReducer } from "react";
import { data } from "./data";
import { departmentReducer } from "./reducer";
import { DepartmentContext } from "./context";

export const  DepartmentProvider = ({children}) => {
    const [state, dispatch] = useReducer(departmentReducer, data);

    return (
        <DepartmentContext.Provider value={{state, dispatch}}>
            {children}
        </DepartmentContext.Provider>
    );
};