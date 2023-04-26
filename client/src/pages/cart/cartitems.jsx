import React from "react";
import { Button, Group, Text } from "@mantine/core";
// import { ShopContext } from "../../context/shop-context";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../features/cartSlice";
import noImage from "../../assets/no-image.png";

export const CartItem = ({ product, cartItem, deleteProduct }) => {
  // useContext(ShopContext);
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.cart);

  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
      <img
        src={product.image ? `http://localhost:5000/${product.image}` : noImage}
        alt={product.name}
        width={50}
        height={50}
        crossOrigin="cross-origin"
      />
      <div style={{ marginLeft: 10 }}>
        <Text size="sm">{product.name}</Text>
        <Group position="left">
          <Button
            // onClick={() => removeFromCart(product.id)}
            variant="outline"
            size="xs"
          >
            -
          </Button>
          {/* <Text>{cartItems[product.id]}</Text> */}
          <Button
            // onClick={() => addToCart(product.id)}
            variant="outline"
            size="xs"
          >
            +
          </Button>
          <Button
            variant="outline"
            size="xs"
            onClick={() => {
              dispatch(removeProduct(product));
            }}
          >
            del
          </Button>
        </Group>
      </div>
    </div>
  );
};

export default CartItem;
