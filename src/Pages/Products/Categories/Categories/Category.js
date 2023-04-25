import React from 'react';
import { Link } from 'react-router-dom';


const Category = ({ allCategory, refetch }) => {

    const { category } = allCategory
    const handleRefetch = () => {
        refetch();

    }

    return (
        <div>
            <Link to={`/products/${category}`} onClick={handleRefetch}><button className='btn btn-ghost'>{category}</button></Link>
        </div>
    );
};

export default Category;