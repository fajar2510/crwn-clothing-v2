import { createContext, useState, useEffect } from "react";

import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";

export const ProductsContex = createContext({
    products: [],
});

export const ProductsProvider = ({ children }) => {
    
    const [products, setProducts] = useState([]);


    const value = { products };
    return (
        <ProductsContex.Provider value={value}>
            {children}
        </ProductsContex.Provider>
    )
}