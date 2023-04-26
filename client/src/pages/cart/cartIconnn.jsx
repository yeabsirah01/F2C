import React from "react";

import { Badge, Image } from "@mantine/core";
import { useState } from "react";
import Cart from "./cartModal";
import { ShopContext } from "../../context/shop-context";
import { useContext } from "react";
import Product from "../../product.json";

function CartIcon() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartItems } = useContext(ShopContext);

  function cartClicked() {
    setIsModalOpen(true);
  }

  const count = Product.filter((product) => cartItems[product.id] !== 0).length;
  return (
    <>
      <button onClick={cartClicked} style={{ position: "relative", right: 30 }}>
        <Image maw={40} src="cartIcon.png" alt="cart" />
        <Badge
          variant="gradient"
          color="red"
          style={{ position: "absolute", top: -8, right: -22 }}
        >
          {count}
        </Badge>
      </button>
      <div>{isModalOpen && <Cart onClose={() => setIsModalOpen(false)} />}</div>
    </>
  );
}

export default CartIcon;
