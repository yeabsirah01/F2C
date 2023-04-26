import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axiosConfig from "../../axiosConfig";
import ProductCards from "../../components/productCard";
import "./style.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await axiosConfig.get("/products");
      setProducts(data);
    };
    getAllProducts();
  }, []);

  return <ProductCards products={products} setProducts={setProducts} />;
};

export default Home;
