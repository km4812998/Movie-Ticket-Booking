import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetShowById } from '../../apicalls/theatres';
import {useSelector} from 'react-redux';
import moment from 'moment';
import StripeCheckout from "react-stripe-checkout";
import Button from '../../components/Button';
import { BookShowTickets, MakePayment } from '../../apicalls/bookings';

function BookShow() {
    const {user} =useSelector(state=>state.users)
    const [show, setShow] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const params = useParams();
    const navigate=useNavigate()

    const getData = async () => {
        try {
            // dispatch(ShowLoading());
            const response = await GetShowById({
                showId: params.id,
            });
            if (response.success) {
                setShow(response.data);

            } else {
                message.error(response.message);
            }
            // dispatch(HideLoading());
        } catch (error) {
            // dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const getSeats = () => {
        const columns = 12;
        const totalSeats = show.totalSeats;
        const rows = Math.ceil(totalSeats / columns);

        return (
            <div className="flex gap-1 flex-col p-2 mt-2">
                {Array.from(Array(rows).keys()).map((seat, index) => {
                    return (
                        <div className="flex gap-1 justify-center" key={index}>
                            {Array.from(Array(columns).keys()).map((column, colIndex) => {
                                const seatNumber = seat * columns + column + 1;
                                let seatClass = "seat";

                                if (selectedSeats.includes(seatNumber)) {
                                    seatClass += " selected-seat";
                                }
                                if (show.bookedSeats.includes(seatNumber)) {
                                    seatClass += " booked-seat";
                                }
                                return (
                                    seatNumber <= totalSeats && (
                                        <div
                                            key={colIndex}
                                            className={seatClass}
                                            onClick={() => {
                                                if (selectedSeats.includes(seatNumber)) {
                                                    setSelectedSeats(
                                                        selectedSeats.filter((item) => item !== seatNumber)
                                                    );
                                                } else {
                                                    setSelectedSeats([...selectedSeats, seatNumber]);
                                                }
                                            }}
                                        >
                                            <h1 className="text-sm">{seatNumber}</h1>
                                        </div>
                                    )
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    };

    const book=async (transactionId)=>{
        try {
            const response = await BookShowTickets({
                show:params.id,
                seats:selectedSeats,
                transactionId,
                user:user._id,
            })
            if (response.success) {
                message.success(response.message)
                navigate('/profile')
            }
            else {
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }



    const onToken = async (token) => {
        try {
            const response = await MakePayment(token,
                selectedSeats.length * show.ticketPrice * 100,
            )
            if (response.success) {
                message.success(response.message)
                book(response.data)
            }
            else {
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }


    useEffect(() => {
        getData();
    }, [params.id]);

    if (!show) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Show information */}
            <div className="flex justify-between card p-2 items-center">
                <div>
                    <h1 className="text-xl">{show.theatre.name}</h1>
                    <h1 className="text-sm">{show.theatre.address}</h1>
                </div>
                <div>
                    <h1 className="text-1xl">
                        {show.movie.title} ({show.movie.language})
                    </h1>
                </div>
                <div>
                    <h1 className="text-sm">
                        {moment(show.date).format("MMM Do yyyy")} -{" "}
                        {moment(show.time, "HH:mm").format("hh:mm A")}
                    </h1>
                </div>
            </div>
            {/* seats */}
            <div className="flex justify-center mt-11">{getSeats()}</div>
            {selectedSeats.length >0 &&    <div className='flex justify-center'>
                <div className='mt-2 flex card p-1 gap-2 text-sm'>
                    <h1>
                        Selected Seats:{selectedSeats.join(",")}
                    </h1>
                    <h1>
                        Total Price:{selectedSeats.length * show.ticketPrice}
                    </h1>
                </div>
            </div>}
            {selectedSeats.length > 0 && 
            <div className='mt-2 flex justify-center'>
                <StripeCheckout
                    token={onToken}
                    amount={selectedSeats.length * show.ticketPrice * 100}
                    billingAddress
                    stripeKey="pk_test_51PL2T9SJ44CsMK9gjYqeaot5sWLXpj4207frqDEOk2XAFlAHV0ux4ocfGXvQOep3n6c6SLOWIeEMu5QatBwjiHkS00a5dFIsx4"
                >
                    <Button title="Book Now" />
                </StripeCheckout>
            </div>}
        </div>
    );
}

export default BookShow;


