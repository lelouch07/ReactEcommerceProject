import './category.styles.scss'
import { UserContext } from '../../contexts/user.context';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../contexts/categories.context';
import { useContext, useEffect,useState } from 'react';
import ProductCard from '../product-card/product-card.component';
const Category=()=>{

    const {category} =useParams();
    const {categoriesMap}=useContext(CategoriesContext);
    const [products,setProducts]=useState(categoriesMap[category]);

    useEffect(()=>{
        setProducts(categoriesMap[category]);

    },[category,categoriesMap])
    return (
        <div className='category-container'>
            { products &&
                products.map((product)=><ProductCard key={product.id} product={product}/>)
            }
        </div>
    )
}
export default Category;