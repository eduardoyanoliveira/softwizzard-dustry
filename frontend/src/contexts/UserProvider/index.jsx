import { useReducer } from "react";
import { data } from "./data";
import { userReducer } from "./reducer";
import { UserContext } from "./context";

export const  UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, data);

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    );
};