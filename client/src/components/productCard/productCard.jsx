import "./styles.css";
import { SelectInput } from "../inputs";
import Button from "../button";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addProduct, removeProduct } from "../../features/cartSlice";
import noImage from "../../assets/no-image.png";
import axiosConfig from "../../axiosConfig";
import { NumberInput } from "@mantine/core";

const weights = [
  "1 KG",
  "2 KG",
  "3 KG",
  "4 KG",
  "5 KG",
  "6 KG",
  "7 KG",
  "8 KG",
  "9 KG",
  "10 KG",
];

const validationSchema = Yup.object().shape({
  quantity: Yup.string()
    .required("quantity is required")
    .notOneOf(["select"], "quantity is required"),
});

const ProductCard = ({ product, cartItem, deleteProduct }) => {
  const { _id } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addToCart = (formData) => {
    console.log(formData);
    const productInCart = products.find((p) => p._id === product._id);
    if (+formData.quantity > +product.stock) {
      toast.error("Don't have enough stock");
    } else if (
      productInCart &&
      +productInCart.quantity + +formData.quantity > +product.stock
    ) {
      toast.error("Don't have enough stock");
    } else {
      dispatch(addProduct({ ...product, quantity: formData.quantity }));
      toast.success("Product added to cart");
    }
  };
  return (
    <div className="productCard">
      <div className="product__image">
        <Link to={`/${product._id}`}>
          <img
            src={
              product.image ? `http://localhost:5000/${product.image}` : noImage
            }
            alt={product.name}
            crossOrigin="cross-origin"
          />
        </Link>
      </div>
      <div className="product__details">
        <div className="data">
          <h3 className="title">{product.name}</h3>
          <p className="stock">{product.stock} KG left</p>
        </div>
        <p className="price"> {product.price} ETB</p>
        {cartItem ? (
          <>
            <Button label={product.quantity + " KG"} size={1} disabled />
            <Button
              label="Delete"
              size={1}
              onClick={() => {
                dispatch(removeProduct(product));
              }}
            />
          </>
        ) : product.createdBy === _id ? (
          <>
            <Button
              label="Edit Product"
              size={1}
              onClick={() => {
                navigate(`/edit/${product._id}`);
              }}
            />
            <Button
              label="Delete Product"
              size={1}
              onClick={() => {
                axiosConfig.delete("/products/" + product._id);
                deleteProduct(product._id);
              }}
            />
          </>
        ) : (
          <Formik
            initialValues={{ quantity: "" }}
            validationSchema={validationSchema}
            onSubmit={addToCart}
          >
            {({ values, errors, touched, handleSubmit, setFieldValue }) => (
              <Form className="" onSubmit={handleSubmit}>
                <Field name="quantity">
                  {({ field }) => (
                    <NumberInput
                      {...field}
                      label="Quantity"
                      placeholder="Enter Quantity"
                      min={1}
                      max={10}
                      onChange={(value) => setFieldValue("quantity", value)}
                      error={touched.quantity && errors.quantity}
                      formatter={(value) =>
                        !Number.isNaN(parseFloat(value))
                          ? `${value} KG`.replace(
                              /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                              ","
                            )
                          : "KG "
                      }
                    />
                  )}
                </Field>
                <Button label="Add to cart" size={6} type="submit" />
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
