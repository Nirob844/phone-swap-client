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
        <div>
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