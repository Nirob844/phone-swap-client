import React, { useState } from 'react';
import BookingModal from '../../BookingModal/BookingModal';

const SingleCategory = ({ singleCategory, refetch }) => {

    const [modal, setModal] = useState('')
    const { sellerName, image, date, model, condition, location, purchase, description, resellPrice, originalPrice } = singleCategory

    return (
        <div className=' m-5 '>
            <div className="card lg:card-side bg-gray-900 shadow-xl">
                <figure><img src={image} alt="Album" /></figure>
                <div className="card-body">
                    <div className='flex justify-between'>
                        <div>
                            <h2 className="text-xl">Product Model : {model}</h2>
                            <p>Condition : {condition}</p>
                            <p>Seller : {sellerName}</p>
                            <p>Used : {purchase}</p>
                            <p>Description : {description}</p>
                        </div>
                        <div>
                            <div>
                                <p>Resell Price : {resellPrice}</p>
                                <p>Original Price : {originalPrice}</p>
                                <p>{location}</p>
                                <p>{date}</p>
                            </div>
                            <div className='m-3'>
                                <label htmlFor="booking-modal" className="btn btn-active btn-ghost">Book Now</label>
                                <button className='btn btn-active btn-ghost'>Wishlist</button>
                                <BookingModal
                                    singleCategory={singleCategory}
                                    setModal={setModal}
                                    refetch={refetch}
                                ></BookingModal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCategory;