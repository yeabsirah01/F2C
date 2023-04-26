import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosConfig from "../../axiosConfig";
import ProductCards from "../../components/productCard";

const Profile = () => {
	const { _id } = useSelector(state => state.user);
	const [products, setProducts] = useState([]);
	useEffect(() => {
		const getAllProducts = async () => {
			const { data } = await axiosConfig.get("/products/user/" + _id);
			setProducts(data);
		};
		getAllProducts();
	}, [_id]);
	return <ProductCards products={products} setProducts={setProducts} />;
};

export default Profile;
