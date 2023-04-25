import React from 'react';
import { useQuery } from 'react-query';
import Category from './Category';
import './Categories.css';

const Categories = () => {

    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/products/all-category');
            const data = await res.json();
            return data
        }
    })


    return (
        <div>
            <div className='category-container'>
                <div className='bg-gray-800 w-3/4 shadow-2xl'>
                    <p>all category : {categories.length}</p>
                    {
                        categories.map(allCategory => <Category
                            key={allCategory._id}
                            allCategory={allCategory}
                        >
                        </Category>)
                    }
                </div>
                <p>all product</p>
            </div>

        </div>
    );
};

export default Categories;