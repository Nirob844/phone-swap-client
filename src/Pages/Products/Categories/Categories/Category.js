import React from 'react';

const Category = ({ allCategory }) => {

    const { category, _id } = allCategory

    return (
        <div>
            <p>{category}</p>
        </div>
    );
};

export default Category;