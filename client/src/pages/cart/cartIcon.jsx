import React from "react";

import { Badge, Image } from "@mantine/core";
import { useState } from "react";
// import Cart from "./cartModal";
// import { ShopContext } from "../../context/shop-context";
import { useContext } from "react";
// import Product from "../../product.json";
import Cart from "./indes";
import { IconShoppingCart } from "@tabler/icons-react";
import { useSelector } from "react-redux";

function CartIcon() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { cartItems } = useContext(ShopContext);

  function cartClicked() {
    setIsModalOpen(true);
  }
  const products = useSelector((state) => state.cart.products);
  const x = products.length;
  // const count = Product.filter((product) => cartItems[product.id] !== 0).length;
  return (
    <>
      <div onClick={cartClicked} style={{ position: "relative", right: 30 }}>
        <IconShoppingCart maw={40} name="shopping-cart" alt="cart" />
        {x !== 0 && (
          <Badge
            variant="gradient"
            color="red"
            style={{ position: "absolute", top: -8, right: -22 }}
          >
            {x}
          </Badge>
        )}
      </div>
      <div>{isModalOpen && <Cart onClose={() => setIsModalOpen(false)} />}</div>
    </>
  );
}

export default CartIcon;
