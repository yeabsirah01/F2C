import React from "react";
import { AiFillStar } from "react-icons/ai";

const Review = ({ review }) => {
	return (
		<div className="review">
			<div className="product__rating">
				<p>{review.count}</p>
				<AiFillStar />
			</div>
			<div className="review__title">{review.createdBy.name}</div>
			<p className="review__text">{review.text}</p>
		</div>
	);
};

export default Review;
