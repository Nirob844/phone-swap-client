import React from 'react';

const SingleCategory = ({ singleCategory }) => {

    console.log(singleCategory);
    const { name, seller } = singleCategory
    return (
        <div>
            <p>name {name}</p>
            <p>seller {seller}</p>

        </div>
    );
};

export default SingleCategory;