import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axiosConfig from "../../axiosConfig";
import noImage from "../../assets/no-image.png";
import "./styles.css";
import Button from "../../components/button";
import { Form, Formik } from "formik";
import { SelectInput, TextAreaInput } from "../../components/inputs";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../features/cartSlice";
import * as Yup from "yup";
import Review from "./review";

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

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [seller, setSeller] = useState({});
  const [review, setReview] = useState(0);
  useEffect(() => {
    const getProductData = async () => {
      try {
        const { data: product } = await axiosConfig.get("/products/" + id);
        const { data: seller } = await axiosConfig.get(
          "/users/" + product.createdBy
        );
        setProduct(product);
        setSeller(seller);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("unathorized");
          toast.error("Unauthorized Access! Please log in.");
          // Handle HTTP 401 error
          // Show a message to the user indicating they are not authorized to access the resource
          // Redirect the user to the login page or take any other appropriate action
        } else {
          // Handle other errors
        }
      }
    };
    getProductData();
  }, [id]);

  const dispatch = useDispatch();
  const {
    cart: { products },
    user: { _id: userId },
  } = useSelector((state) => state);

  const addToCart = (formData) => {
    const productInCart = products.find((p) => p._id === product._id);
    if (+formData.quantity.split(" ")[0] > +product.stock) {
      toast.error("Don't have enough stock");
    } else if (
      productInCart &&
      +productInCart.quantity + +formData.quantity.split(" ")[0] >
        +product.stock
    ) {
      toast.error("Don't have enough stock");
    } else {
      dispatch(
        addProduct({ ...product, quantity: formData.quantity.split(" ")[0] })
      );
      toast.success("Product added to cart");
    }
  };
  const isOwnProduct = product.createdBy === userId;
  const averageReview = (
    product.reviews?.reduce((acc, val) => acc + +val.count, 0) /
      product.reviews?.length || 0
  ).toFixed(1);
  const shouldDisplayReview =
    !isOwnProduct &&
    product.reviews?.every((val) => val.createdBy.id !== userId);

  const submitReview = async (formData) => {
    if (formData.review && review) {
      const { data } = await axiosConfig.put(
        "/products/review/" + product._id,
        {
          count: review,
          text: formData.review,
        }
      );
      setProduct(data);
      toast.success("Review Added");
    } else toast.error("Fill the review");
  };
  return (
    <div className="productDetails">
      <div className="product__left">
        <div className="product__image">
          <img
            src={
              product.image ? `http://localhost:5000/${product.image}` : noImage
            }
            alt={product.name}
            crossOrigin="cross-origin"
          />
        </div>
        {isOwnProduct || (
          <Formik
            initialValues={{ quantity: "select" }}
            validationSchema={validationSchema}
            onSubmit={addToCart}
          >
            {() => (
              <Form className="form">
                <SelectInput
                  placeholder="Select Quantity"
                  name="quantity"
                  options={weights}
                  size={6}
                />
                <Button label="Add to cart" size={6} />
              </Form>
            )}
          </Formik>
        )}
      </div>
      <div className="product__right">
        <h1 className="product__name">
          {product.name} <br /> <span>{product.category}</span>
        </h1>
        <h2 className="product__price">
          {product.price} ETB <span>({product.stock} KG Left)</span>
        </h2>
        <div className="product__rating">
          <p>{averageReview}</p>
          <AiFillStar />
        </div>
        <p className="product__description">{product.description}</p>
        <div className="sellerDetails">
          <p>Seller Details</p>
          <p className="seller__name">{seller.firstName}</p>
          <address>
            {seller.phone} <br />
            {seller.address} <br />
            {seller.region}
            <br />
            {seller["pin code"]}
          </address>
        </div>
        {shouldDisplayReview && (
          <div className="reviewForm">
            <h2>Write a review</h2>
            <div className="reviewStars">
              {[1, 2, 3, 4, 5].map((val) => {
                const setReviewCount = () => setReview(val);
                if (val <= review) {
                  return <AiFillStar onClick={setReviewCount} key={val} />;
                }
                return <AiOutlineStar onClick={setReviewCount} key={val} />;
              })}
            </div>
            <Formik initialValues={{ review: "" }} onSubmit={submitReview}>
              {() => {
                return (
                  <Form className="form">
                    <TextAreaInput name="review" />
                    <Button label="Submit" style={{ gridColumn: "11/13" }} />
                  </Form>
                );
              }}
            </Formik>
          </div>
        )}
        <div className="reviews">
          <h2>Ratings & Reviews</h2>
          {product.reviews?.map((review) => (
            <Review review={review} key={review._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
