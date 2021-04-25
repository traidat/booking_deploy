import React from "react";

const YourOrder = ({ room, numberRoom }) => {
  return (
    <div class="order-table table-responsive">
      <h3 class="title">Your Order</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Room Name</th>
            <th scope="col">Price</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="product-name">
              <a href="#">{room.roomName}</a>
            </td>
            <td class="product-total">
              <span class="subtotal-amount">${room.price}</span>
            </td>
            <td class="product-total">
              <span class="subtotal-amount">${numberRoom * room.price}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default YourOrder;
