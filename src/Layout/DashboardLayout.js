import React from 'react';
import Header from '../Pages/Shared/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';

const DashboardLayout = () => {
    return (
        <div>
            <Header></Header>
            <div className='category-layout'>
                <div>

                </div>
                <div>
                    <Outlet />
                </div>
            </div>
            <Footer></Footer>

        </div>
    );
};

export default DashboardLayout;