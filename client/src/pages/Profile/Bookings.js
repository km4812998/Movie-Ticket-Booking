import React, { useEffect, useState } from "react";
import { message, Row, Col } from "antd";
import { GetBookingsOfUser } from "../../apicalls/bookings";
import moment from "moment";

function Bookings() {
  const [bookings = [], setBookings] = useState([]);        

  const getData = async () => {
    try {
      
      const response = await GetBookingsOfUser();
      if (response.success) {
        setBookings(response.data);
      } else {
        message.error(response.message);
      }
     
    } catch (error) {
      
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Row gutter={[16, 16]}>
        {bookings.map((booking) => (
          <Col span={12}>
            <div className="card p-2 flex justify-between uppercase">
              <div>
                
                <h1 className="text-xl">
                  {booking.show.movie.title} ({booking.show.movie.language})
                </h1>
                <div className="divider"></div>
                <h1 className="text-sm">
                  {booking.show.theatre.name} ({booking.show.theatre.address})
                </h1>
                <h1 className="text-sm">
                  Date & Time: {moment(booking.show.date).format("MMM Do YYYY")}{" "}
                  - {moment(booking.show.time, "HH:mm").format("hh:mm A")}
                </h1>

                <h1 className="text-sm">
                  Amount : ₹ {booking.show.ticketPrice * booking.seats.length}
                </h1>
                <h1 className="text-sm">Booking ID: {booking._id}</h1>
              </div>

              <div>
                <img
                  src={booking.show.movie.poster}
                  alt=""
                  height={100}
                  width={100}
                  className="br-1"
                />
                <h1 className="text-sm">Seats: {booking.seats.join(", ")}</h1>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Bookings;
