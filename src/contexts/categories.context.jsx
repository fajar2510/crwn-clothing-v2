import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContex = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(()=> {
       const getCategoriesMap = async () => {
        const categoryMap = await getCategoriesAndDocuments();
        console.log(categoryMap);
        setCategoriesMap(categoryMap)
       } 
        getCategoriesMap();
    },[]);


    const value = { categoriesMap };
    return (
        <CategoriesContex.Provider value={value}>
            {children}
        </CategoriesContex.Provider>
    )
}