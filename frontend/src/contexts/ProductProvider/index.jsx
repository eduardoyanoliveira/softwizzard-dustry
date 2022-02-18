import { useReducer } from "react";
import { data } from "./data";
import { productReducer } from "./reducer";
import { ProductContext } from "./context";

export const  ProductProvider = ({children}) => {
    const [state, dispatch] = useReducer(productReducer, data);

    return (
        <ProductContext.Provider value={{state, dispatch}}>
            {children}
        </ProductContext.Provider>
    );
};