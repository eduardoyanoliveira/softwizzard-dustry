import { useReducer } from "react";
import { MobileMenuContext } from "./context";
import { reducer } from "./reducer";
import { data } from "./data";

export default function MobileMenuProvider({children}){
    const [state, dispatch] = useReducer(reducer, data);

    return(
        <MobileMenuContext.Provider value={{state, dispatch}}>
            {children}
        </MobileMenuContext.Provider>
    );

};