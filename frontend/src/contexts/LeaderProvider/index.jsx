import { useReducer } from "react";
import { data } from "./data";
import { leaderReducer } from "./reducer";
import { LeaderContext } from "./context";

export const  LeaderProvider = ({children}) => {
    const [state, dispatch] = useReducer(leaderReducer, data);

    return (
        <LeaderContext.Provider value={{state, dispatch}}>
            {children}
        </LeaderContext.Provider>
    );
};