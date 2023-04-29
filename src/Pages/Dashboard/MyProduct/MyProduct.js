import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';


const MyProduct = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/product?email=${user?.email}`;
    // console.log(url);
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
        return <Loading />
    }
    const handleAdvertise = (id) => {
        fetch(`http://localhost:5000/product-advertise/${id}`, {
            method: "PATCh",
            headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.acknowledged > 0) {
                    toast.success("advertise Successfully");
                    refetch();
                }
            });
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/product-delete/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount > 0) {
                    toast.success("User deleted successfully");
                    refetch();
                }
            });
    };

    const handleStatus = () => {

    }

    return (
        <div className='bg-gray-800 shadow-2xl mx-auto my-10'>
            <h2 className="text-3xl">All Users</h2>
            <div className="">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>list</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Advertise</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className='bg-gray-700'>
                        {
                            products?.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td>{product.model}</td>
                                <td>{product.price}</td>
                                <td> <button onClick={() => handleStatus(product._id)} className='btn btn-xs btn-primary'>Available</button></td>
                                <td> {product.status === 'promoted' ? (<button className='btn btn-xs btn-primary'>Promoted</button>)
                                    :
                                    (
                                        <button onClick={() => handleAdvertise(product._id)} className='btn btn-xs btn-primary'>ADS</button>
                                    )}</td>
                                <td><button onClick={() => handleDelete(product._id)} className='btn btn-xs btn-danger'>Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProduct;