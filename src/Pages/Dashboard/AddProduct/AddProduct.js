import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { toast } from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';

const AddProduct = () => {

    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const date = new Date();
    const navigate = useNavigate();
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const { data: categories, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = fetch('http://localhost:5000/products');
            const data = (await res).json();
            return data;
        },
    });


    const handleAddProduct = (data) => {
        console.log(data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((imgData) => {
                if (imgData.success) {
                    const product = {
                        email: user.email,
                        sellerName: user.displayName,
                        condition: data.condition,
                        location: data.location,
                        purchase: data.purchase,
                        description: data.description,
                        resellPrice: data.resellPrice,
                        originalPrice: data.originalPrice,
                        category: data.category,
                        model: data.name,
                        number: data.phone,
                        image: imgData.data.url,
                        date,
                    };
                    // save product information into the database
                    fetch('http://localhost:5000/product', {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            authorization: `bearer ${localStorage.getItem("accessToken")}`,
                        },
                        body: JSON.stringify(product),
                    })
                        .then((res) => res.json())
                        .then((result) => {
                            toast.success(`${data.category} is added successfully`);
                            reset();
                        });
                }
            });
    };
    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div>
            <h2 className="text-3xl lg:text-5xl text-center my-5">Add Products</h2>
            <form onSubmit={handleSubmit(handleAddProduct)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
                    <input
                        type="text"
                        placeholder="Product Name"
                        className="input input-bordered w-full"
                        {...register("name", { required: true })}
                    />
                    <select
                        className="select select-bordered w-full"
                        {...register("category", { required: true })}
                    >
                        <option disabled selected>
                            category
                        </option>
                        <option value={"Apple"}>Apple</option>
                        <option value={"Xiaomi"}>Xiaomi</option>
                        <option value={"Realmi"}>Realmi</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Original Price"
                        className="input input-bordered w-full"
                        {...register("originalPrice", { required: true })}
                    />
                    <input
                        type="text"
                        placeholder="Current Price"
                        className="input input-bordered w-full"
                        {...register("resellPrice", { required: true })}
                    />
                    <select
                        className="select select-bordered w-full"
                        {...register("condition", { required: true })}
                    >
                        <option disabled selected>
                            Product Condition?
                        </option>
                        <option value={"Excellent"}>Excellent</option>
                        <option value={"Good"}>Good</option>
                        <option value={"Fair"}>Fair</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Year of Purchase? Example: 1Y 2M"
                        className="input input-bordered w-full"
                        {...register("purchase", { required: true })}
                    />
                    <input
                        type="number"
                        placeholder="Seller Phone Number"
                        className="input input-bordered w-full"
                        {...register("phone", { required: true })}
                    />
                    <input
                        type="text"
                        placeholder="Meeting Location"
                        className="input input-bordered w-full"
                        {...register("location", { required: true })}
                    />
                </div>

                <div className="w-full px-5">
                    <div>
                        <input
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="file_input"
                            type="file"
                            {...register("image", { required: true })}
                        />
                    </div>
                    <textarea
                        className="textarea textarea-bordered w-full h-28 mt-5"
                        placeholder="Product Description"
                        {...register("description", { required: true })}
                    ></textarea>
                    <input className='btn btn-outline w-full mt-4' value="Add Product" type="submit" />
                </div>
            </form>
        </div>
    );
};

export default AddProduct;