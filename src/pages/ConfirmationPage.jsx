import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { OrderContext } from "../context/order.context";

import { API_URL } from "../services/API_URL";

import axios from "axios";

const ConfirmationPage = () => {
  const { newOrder, allOrders, setAllOrders, setNewOrder } =
    useContext(OrderContext);

  const hours = Math.floor(
    newOrder.packetDuration.reduce((total, duration) => {
      return total + duration;
    }, 0) / 60
  );
  const minutes =
    newOrder.packetDuration.reduce((total, duration) => {
      return total + duration;
    }, 0) % 60;

  const submitOrder = (order) => {
    axios
      .post(API_URL + "/orders", order)
      .then((response) => {
        let newOrders = [response.data, ...allOrders];
        setAllOrders(newOrders);
        setNewOrder({
          size: "",
          sizePrice: "",
          packet: [],
          packetPrice: [],
          packetDuration: [],
          date: "",
          time: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // Scroll to the top of the page when the component is mounted
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="confirmation-page">
      <h1>Confirmation</h1>
      <div className="confirmation-info">
        <strong className="date-time-title">Date & Time</strong>
        <div className="client-time-info">
          <i className="fas fa-clock"></i>
          <div>{newOrder.time}</div>
        </div>

        <div className="client-date-info">
          <i className="fas fa-calendar"></i>
          <div>{newOrder.date.toString().slice(0, 16)}</div>
        </div>

        <hr
          style={{
            width: "20vw",
            height: "1.5px",
            backgroundColor: "black",
            border: "none",
          }}
        ></hr>

        <strong className="service-size-title">Size & Services</strong>
        <div className="client-size-info">
          <i class="fas fa-paw"></i>
          <div>Dog Size: {newOrder.size}</div>
        </div>
        <div className="client-service-info">
          <i class="fas fa-paw"></i>
          <div>Services: {newOrder.packet.join(", ")}</div>
        </div>

        <div className="client-duration-info">
          <i class="fas fa-hourglass"></i>
          <div>
            {hours > 1 ? `${hours} hours` : `${hours} hour`} {" and "}
            {minutes > 1 ? `${minutes} minutes` : `${minutes} minute`}
          </div>
        </div>

        <hr
          style={{
            width: "20vw",
            height: "1.5px",
            backgroundColor: "black",
            border: "none",
          }}
        ></hr>

        <strong className="details-title">Your Details</strong>
        <div className="client-name-info">
          <i className="fas fa-user"></i>
          <div>
            {newOrder.firstName} {newOrder.lastName}
          </div>
        </div>
        <div className="client-phone-info">
          <i className="fas fa-phone"></i>
          <div>
            ({newOrder.phone.slice(0, 3)}){newOrder.phone.slice(3, 6)}-
            {newOrder.phone.slice(6)}
          </div>
        </div>
        <div className="client-email-info">
          <i className="fas fa-envelope"></i>
          <div>{newOrder.email}</div>
        </div>

        <hr
          style={{
            width: "20vw",
            height: "1.5px",
            backgroundColor: "black",
            border: "none",
          }}
        ></hr>

        <strong className="summary-title">Summary</strong>
        <div className="service-info">
          <div>Services</div>
          <div>
            $
            {newOrder.packetPrice.reduce((total, packet) => {
              return total + packet;
            }, 0)}
          </div>
        </div>

        <div className="dog-size-info">
          <div>Dog size </div>
          <div>${newOrder.sizePrice}</div>
        </div>

        <div className="total-info">
          <strong>Total</strong>
          <div>
            $
            {newOrder.packetPrice.reduce((total, packet) => {
              return total + packet;
            }, 0) + newOrder.sizePrice}{" "}
          </div>
        </div>
      </div>
      <Link to="/last-orders">
        <button
          className="book-now-button"
          onClick={() => {
            submitOrder(newOrder);
          }}
        >
          Book Now
        </button>
      </Link>
    </div>
  );
};

export default ConfirmationPage;
