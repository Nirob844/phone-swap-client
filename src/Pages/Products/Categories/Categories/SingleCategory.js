import React from 'react';

const SingleCategory = ({ singleCategory, refetch }) => {


    const { name, pic, category } = singleCategory

    return (
        <div className='bg-gray-700 shadow-2xl m-10 p-5'>
            <h1>Product Category : {category}</h1>
            <div className="card w-96 bg-base-100 shadow-xl image-full">
                <figure><img src={pic} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCategory;