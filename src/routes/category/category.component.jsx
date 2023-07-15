import {React, useContext, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { CategoryContext } from "../../contexts/categories.context";
import { ProductCard } from '../../components/product-card/product-card.component';

import "./category.styles.scss";

const Category = () => {
    const {category} = useParams();
    const {categoriesMap} = useContext(CategoryContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() =>{
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

  return (
    <div className='category-container'>
        {products && 
        products.map((product) => 
        <ProductCard key={product.id} product={products} /> )}
    </div>
  )
}

export default Category
