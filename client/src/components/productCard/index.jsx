// import React, { useCallback, useEffect, useState } from "react";
// import ProductCard from "./productCard";

// const ProductCards = ({ products, setProducts }) => {
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [filterValue, setFilterValue] = useState("select");
//   const filter = useCallback((filterValue, products) => {
//     if (filterValue === "select") {
//       setFilteredProducts(products);
//     } else {
//       const data = products.filter((p) => p.category === filterValue);
//       setFilteredProducts(data);
//     }
//   }, []);

//   useEffect(() => {
//     filter(filterValue, products);
//   }, [filterValue, products, filter]);

//   return (
//     <div className="productCards">
//       <div className="input" style={{ gridColumn: "1/-1" }}>
//         <select
//           style={{ marginLeft: "auto", width: "350px" }}
//           onChange={(e) => setFilterValue(e.target.value)}
//           value={filterValue}
//         >
//           <option value="select">Filter</option>
//           {["Fruits", "Vegetables", "Vines"].map((option) => (
//             <option key={option}>{option}</option>
//           ))}
//         </select>
//       </div>
//       {filteredProducts.map((product) => (
//         <ProductCard
//           product={product}
//           key={product._id}
//           deleteProduct={(id) => {
//             const newProducts = products.filter((p) => p._id !== id);
//             setProducts(newProducts);
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default React.memo(ProductCards);
import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "./productCard";
import { Slider, Select, RangeSlider } from "@mantine/core";

const ProductCards = ({ products, setProducts }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterCategory, setFilterCategory] = useState("select");
  const [filterPriceRange, setFilterPriceRange] = useState([0, 100]);
  const [filterDate, setFilterDate] = useState("newest");
  const [priceFilterActive, setPriceFilterActive] = useState(false);

  const filter = useCallback(
    (category, priceRange, date, products) => {
      let data = [...products];

      // Filter by category
      if (category !== "select") {
        data = data.filter((p) => p.category === category);
      }

      // Filter by price range
      if (priceFilterActive) {
        data = data.filter(
          (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
        );
      }

      // Sort by date
      if (date === "newest") {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else {
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      }

      setFilteredProducts(data);
    },
    [priceFilterActive]
  );

  useEffect(() => {
    filter(filterCategory, filterPriceRange, filterDate, products);
  }, [filterCategory, filterPriceRange, filterDate, products, filter]);

  return (
    <div className="productCards">
      <div className="input" style={{ gridColumn: "1/-1" }}>
        <Select
          style={{ marginLeft: "auto", width: "350px" }}
          placeholder="Filter by category"
          value={filterCategory}
          onChange={(value) => setFilterCategory(value)}
          data={["select", "Fruits", "Vegetables", "Vines"].map((option) => ({
            value: option,
            label: option,
          }))}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "16px" }}>
            Price range: {filterPriceRange[0]} Birr - {filterPriceRange[1]} Birr
          </div>
          <RangeSlider
            style={{ flexGrow: 1 }}
            min={0}
            max={100}
            step={1}
            defaultValue={filterPriceRange}
            onChange={(value) => {
              setPriceFilterActive(true);
              setFilterPriceRange(value);
            }}
          />
        </div>
        <Select
          style={{ marginLeft: "auto", width: "350px" }}
          placeholder="Sort by date"
          value={filterDate}
          onChange={(value) => setFilterDate(value)}
          data={[
            { value: "newest", label: "Newest first" },
            { value: "oldest", label: "Oldest first" },
          ]}
        />
      </div>
      {filteredProducts.map((product) => (
        <ProductCard
          product={product}
          key={product._id}
          deleteProduct={(id) => {
            const newProducts = products.filter((p) => p._id !== id);
            setProducts(newProducts);
          }}
        />
      ))}
    </div>
  );
};

export default React.memo(ProductCards);
