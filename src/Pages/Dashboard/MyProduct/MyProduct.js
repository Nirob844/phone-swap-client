import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';

const MyProduct = () => {
    const { user } = useContext(AuthContext);

    const url = 'http://localhost:5000/bookings';
    const {
        data: products = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["products", user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            const data = await res.json();
            return data;
        },
    });

    if (isLoading) {
        <Loading />
    }
    const handleAdvertise = (_id) => {
        fetch(`${process.env.REACT_APP_API_URL}/advertise/${_id}`, {
            method: "PUT",
            headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged > 0) {
                    toast.success("advertise added Successfully");
                    refetch();
                }
            });
    };

    const handleDeleteUser = () => {

    }
    const handleStatus = () => {

    }

    return (
        <div className='bg-gray-800 shadow-2xl mx-auto my-10'>
            <h2 className="text-3xl">All Users</h2>
            <div className="">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Promoted</th>
                            <th>Added</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className='bg-gray-700'>
                        {
                            products?.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td>{product.model}</td>
                                <td>{product.price}</td>
                                <td>{product?.role !== 'Seller' && <button onClick={() => handleStatus(user._id)} className='btn btn-xs btn-primary'>Available</button>}</td>
                                <td>{product?.role !== 'Seller' && <button onClick={() => handleAdvertise(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td>
                                <td><button onClick={() => handleDeleteUser(user._id)} className='btn btn-xs btn-danger'>Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProduct;