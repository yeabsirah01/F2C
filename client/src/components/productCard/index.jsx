import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "./productCard";

const ProductCards = ({ products, setProducts }) => {
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [filterValue, setFilterValue] = useState("select");
	const filter = useCallback((filterValue, products) => {
		if (filterValue === "select") {
			setFilteredProducts(products);
		} else {
			const data = products.filter(p => p.category === filterValue);
			setFilteredProducts(data);
		}
	}, []);

	useEffect(() => {
		filter(filterValue, products);
	}, [filterValue, products, filter]);

	return (
		<div className="productCards">
			<div className="input" style={{ gridColumn: "1/-1" }}>
				<select
					style={{ marginLeft: "auto", width: "350px" }}
					onChange={e => setFilterValue(e.target.value)}
					value={filterValue}
				>
					<option value="select">Filter</option>
					{["Fruits", "Vegetables", "Vines"].map(option => (
						<option key={option}>{option}</option>
					))}
				</select>
			</div>
			{filteredProducts.map(product => (
				<ProductCard
					product={product}
					key={product._id}
					deleteProduct={id => {
						const newProducts = products.filter(p => p._id !== id);
						setProducts(newProducts);
					}}
				/>
			))}
		</div>
	);
};

export default React.memo(ProductCards);
