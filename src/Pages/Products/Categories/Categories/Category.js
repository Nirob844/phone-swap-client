import React from 'react';
import { Link } from 'react-router-dom';


const Category = ({ allCategory }) => {

    const { category } = allCategory

    return (
        <div>
            <Link to={`${category}`}><button className='btn btn-ghost'>{category}</button></Link>
        </div>
    );
};

export default Category;