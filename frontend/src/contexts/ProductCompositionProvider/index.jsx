import { useReducer } from "react";
import { data } from "./data";
import { productCompositionReducer } from "./reducer";
import { ProductCompositionContext } from "./context";

export const  ProductCompositionProvider = ({children}) => {
    const [state, dispatch] = useReducer(productCompositionReducer, data);

    return (
        <ProductCompositionContext.Provider value={{state, dispatch}}>
            {children}
        </ProductCompositionContext.Provider>
    );
};