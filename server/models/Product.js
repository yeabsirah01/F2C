const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
	{
		category: {
			type: String,
			enum: ["Vines", "Vegetables", "Fruits"],
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		price: {
			type: String,
			required: true,
		},
		stock: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
		},
		reviews: {
			type: [
				{
					count: Number,
					text: String,
					createdBy: {
						id: mongoose.Types.ObjectId,
						name: String,
					},
				},
			],
			default: [],
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
