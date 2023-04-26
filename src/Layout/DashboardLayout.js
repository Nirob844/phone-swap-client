import React, { useContext } from 'react';
import Header from '../Pages/Shared/Header/Header';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { toast } from 'react-hot-toast';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';


const DashboardLayout = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    const [isSeller] = useSeller(user?.email)

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('logout successfull')
            })

            .catch(err => console.error(err));
    }
    return (
        <div>
            <Header></Header>
            <div className='category-layout'>
                <div className='bg-gray-900 shadow-2xl h-screen'>
                    <ul className='my-20 mx-10  p-1'>
                        <li className='btn btn-ghost'><Link to="/dashboard">Dashboard</Link></li>
                        <li className='btn btn-ghost'><Link to="/dashboard/my-orders">My Orders</Link></li>
                        {
                            isAdmin && <>
                                <li><Link className='btn btn-ghost' to="/dashboard/all-users">All Users</Link></li>
                            </>
                        }
                        {
                            isSeller && <>
                                <li><Link className='btn btn-ghost' to="/dashboard/add-product">Add Product</Link></li>
                            </>

                        }
                        <li className='btn btn-ghost text-base'><button onClick={handleLogOut} >Sign out</button></li>
                    </ul>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;