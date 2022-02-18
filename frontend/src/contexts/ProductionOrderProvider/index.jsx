import { useReducer } from "react";
import { data } from "./data";
import { productionOrderReducer } from "./reducer";
import { ProductionOrderContext } from "./context";

export const  ProductionOrderProvider = ({children}) => {
    const [state, dispatch] = useReducer(productionOrderReducer, data);

    return (
        <ProductionOrderContext.Provider value={{state, dispatch}}>
            {children}
        </ProductionOrderContext.Provider>
    );
};