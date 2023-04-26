import React, { useContext } from "react";
import { useDisclosure } from "@mantine/hooks";

import { Modal, Group, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { ShopContext } from "../../context/shop-context";

import Product from "../../product.json";
import CartItem from "./cartitems";

const Cart = ({ onClose }) => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const navigate = useNavigate();
  const totalPrice = getTotalCartAmount();
  const [opened, { open, close }] = useDisclosure(true, {
    onOpen: () => {
      console.log("Opened");
    },
    onClose: () => {
      console.log("Closed");
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        centered
        c="#8ce99a"
        my="0"
        py="0"
      >
        <div c="blue.6" ta="center">
          <h2
            style={{
              color: "red",
              padding: 0,
              margin: 0,
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Cart
          </h2>
        </div>
        <div className="cartItems">
          {Product.map((product) => {
            if (cartItems[product.id] !== 0) {
              return <CartItem product={product} />;
            }
          })}
        </div>
        <div> Total Price: {totalPrice} ETB</div>
      </Modal>
    </>
  );

  // ----------------------------------
};

export default Cart;
