import React from 'react';
import './CategoryLayout.css'
import Header from '../Pages/Shared/Header/Header';
import Footer from '../Pages/Shared/Footer/Footer';
import Categories from '../Pages/Products/Categories/Categories/Categories';
import { Outlet } from 'react-router-dom';

const CategoryLayout = () => {
    return (
        <div>
            <Header></Header>
            <div className='category-layout'>
                <div>
                    <Categories />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
            <Footer></Footer>

        </div>
    );
};

export default CategoryLayout;