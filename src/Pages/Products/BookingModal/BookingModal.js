import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { toast } from 'react-hot-toast';

const BookingModal = ({ singleCategory, setModal, refetch }) => {

    const { user } = useContext(AuthContext);
    const { category, resellPrice, model, _id, image } = singleCategory;
    const date = new Date('pp')

    const handleBooking = (e) => {
        //console.log("count");
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const model = form.model.value;
        const price = form.price.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const date = form.date.value;
        const location = form.location.value;
        const booking = {
            pId: _id,
            name,
            price,
            email,
            phone,
            model,
            location,
            image,
            date
        };
        fetch('http://localhost:5000/bookings', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(booking),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    setModal(null);
                    toast.success("Booking Confirm");
                    refetch();
                } else {
                    toast.error(data.message);
                }
            });

    }


    return (
        <div>
            <>
                <input type="checkbox" id="booking-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative">
                        <label
                            htmlFor="booking-modal"
                            className="btn btn-sm btn-circle absolute right-2 top-2">
                            ✕
                        </label>
                        <h3 className="text-lg font-bold">{category}</h3>
                        <form onSubmit={handleBooking} className="flex gap-5 flex-col mt-10">
                            <input
                                type="text"
                                name="model"
                                value={model}
                                disabled
                                className="input input-bordered w-full"
                            />

                            <input
                                type="text"
                                defaultValue={user?.displayName}
                                disabled
                                name="name"
                                placeholder="Your name"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                defaultValue={resellPrice}
                                disabled
                                name="price"
                                placeholder=""
                                className="input input-bordered w-full"
                            />
                            <input
                                defaultValue={user?.email}
                                disabled
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full"
                            />
                            <input
                                defaultValue={date}
                                disabled
                                type="text"
                                name="date"
                                placeholder=""
                                className="input input-bordered w-full"
                            />
                            <input
                                type="number"
                                name="phone"
                                placeholder="Your phone number"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                name="location"
                                placeholder="Your Location"
                                className="input input-bordered w-full"
                            />
                            <button className='btn btn-outline w-full mt-4'><input htmlFor="booking-modal" type="submit" value="Submit" /></button>
                        </form>
                    </div>
                </div>
            </>
        </div>
    );
};

export default BookingModal;