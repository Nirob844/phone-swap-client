import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { toast } from 'react-hot-toast';

const Header = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('logout successfull')
            })

            .catch(err => console.error(err));
    }

    const menuItems = <React.Fragment>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/blog">blog</Link></li>
        <li><Link to="/about">About</Link></li>


    </React.Fragment>
    const navbarEnd = <React.Fragment>
        {user?.email ?
            <>
                <li className='lg:hidden'><button>Sign out</button></li>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="">
                        <img className='w-10 h-10 rounded-full' src={user?.photoURL} alt="" />
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 w-32">
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/dashboard/my-orders">My Orders</Link></li>
                        <li><Link to="/dashboard/profile">Profile</Link></li>
                        <li><button onClick={handleLogOut} >Sign out</button></li>
                    </ul>
                </div>
            </>
            :
            <>
                <li><Link to="/login">Sign in</Link></li>
            </>
        }
    </React.Fragment>

    return (
        <div>
            <div className="navbar bg-gray-800 shadow-2xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                    <Link className="btn btn-ghost normal-case text-xl text-white"> PhoneSwap </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {menuItems}
                    </ul>
                </div>
                <div className="navbar-end mr-5">
                    <ul>
                        {navbarEnd}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;