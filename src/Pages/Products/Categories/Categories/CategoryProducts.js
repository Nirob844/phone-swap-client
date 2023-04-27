import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../../../Shared/Loading/Loading';
import SingleCategory from './SingleCategory';

const CategoryProducts = () => {

    const { category } = useParams();
    const { data: categoryProducts = [], refetch, isLoading } = useQuery({
        queryKey: ['categoryProducts'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/${category}`);
            const data = await res.json();
            return data
        }
    })
    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2'>
            <h1 className='text-2xl p-5 bg-gray-700 mt-5'>Product Category : {category}</h1>
            {
                categoryProducts.map(singleCategory => <SingleCategory
                    key={singleCategory._id}
                    singleCategory={singleCategory}
                    refetch={refetch}
                ></SingleCategory>)
            }
        </div>
    );
};

export default CategoryProducts;