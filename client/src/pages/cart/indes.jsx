import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "../../axiosConfig";
import Button from "../../components/button";
import ProductCard from "../../components/productCard/productCard";
import { clearCart } from "../../features/cartSlice";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles.css";
import { useEffect } from "react";
import CartItem from "./cartitems";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

const Cart = ({ onClose }) => {
  const { products, totalCartAmount } = useSelector((state) => state.cart);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const query = {};
    location.search
      .slice(1)
      .split("&")
      .forEach((v) => {
        query[v.split("=")[0]] = v.split("=")[1];
      });
    if (query.clear_cart === "true") {
      axiosConfig.patch("/products/none", { products });
      dispatch(clearCart());
      toast.success("Product ordered successfully", { toastId: "ordered" });
    }
    // eslint-disable-next-line
  }, [location.search, dispatch]);
  const checkOut = async () => {
    try {
      const { data } = await axiosConfig.post("/products/checkout", {
        products,
      });
      window.location = data.payment_url;
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Something went wrong");
    }
  };

  const [opened, { open, close }] = useDisclosure(true, {
    onOpen: () => {
      console.log("Opened");
    },
    onClose: () => {
      console.log("Closed");
    },
  });

  const totalPrice = products
    .reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  console.log(totalPrice);

  return (
    // <div className="cart">
    // 	<div className="productCards">
    // 		{products.map(p => (
    // 			<ProductCard product={p} cartItem key={p._id} />
    // 		))}
    // 		<div
    // 			className="checkout"
    // 			style={{ gridColumn: "1/-1", display: "flex", justifyContent: "center" }}
    // 		>
    // 			{products.length ? (
    // 				<Button label="Checkout" onClick={checkOut} />
    // 			) : (
    // 				<h1>Cart is Empty</h1>
    // 			)}
    // 		</div>
    // 	</div>
    // </div>
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
          {products.map((product) => {
            // return <CartItem product={product} />;
            return <CartItem product={product} cartItem key={product._id} />;
          })}
        </div>

        <div> Total Price: {totalPrice} ETB</div>

        <div
          className="checkout"
          style={{
            gridColumn: "1/-1",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {products.length ? (
            <Button label="Checkout" onClick={checkOut} />
          ) : (
            <h1>Cart is Empty</h1>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Cart;
