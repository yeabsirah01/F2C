const { StatusCodes } = require("http-status-codes");
const { AuthenticationError } = require("../errors");
const Product = require("../models/Product");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const multer = require("multer");
const User = require("../models/User");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

const createProduct = async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req.user.id);
  if (user.role !== "Farmer")
    throw new AuthenticationError(
      "You need a farmer account to do this action"
    );
  upload(req, res, async (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const data = { ...req.body };
      if (req?.file?.filename) data.image = req.file.filename;
      const product = await Product.create({
        ...data,
        createdBy: req.user.id,
      });
      res.status(StatusCodes.CREATED).json(product);
    }
  });
};

const getAllProducts = async (req, res) => {
  let products;
  if (req.params.userId)
    products = await Product.find({ createdBy: req.params.userId });
  else products = await Product.find().sort({ updatedAt: -1 });
  res.status(StatusCodes.OK).json(products);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.status(StatusCodes.OK).json(product);
};

const updateProduct = async (req, res) => {
  const { products } = req.body;
  const { id } = req.params;
  if (products) {
    products.map(async (p) => {
      await Product.findByIdAndUpdate(p._id, { stock: +p.stock - +p.quantity });
    });
    res.status(StatusCodes.OK).json({ msg: "success" });
  } else {
    upload(req, res, async (err) => {
      if (err) {
        res.sendStatus(500);
      } else {
        const data = { ...req.body, image: undefined };
        if (req?.file?.filename) data.image = req.file.filename;
        const product = await Product.findByIdAndUpdate(id, data, {
          new: true,
          runValidators: true,
        });
        res.status(StatusCodes.OK).json(product);
      }
    });
  }
};

const checkOut = async (req, res) => {
  stripe.setApiKey(process.env.STRIPE_KEY);

  const session = await stripe.checkout.sessions.create({
    line_items: req.body.products.map((p) => {
      return {
        price_data: {
          currency: "etb",
          product_data: {
            name: p.name,
          },
          unit_amount: +p.price * 100,
        },
        quantity: +p.quantity,
      };
    }),
    mode: "payment",
    success_url: `http://localhost:3000/cart?clear_cart=true`,
    cancel_url: `http://localhost:3000/cart`,
  });

  res.json({ payment_url: session.url });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.json({ msg: "success" });
};

const reviewProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(
    id,
    {
      $push: {
        reviews: {
          ...req.body,
          createdBy: { id: req.user.id, name: req.user.name },
        },
      },
    },
    { new: true }
  );
  res.json(product);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  checkOut,
  deleteProduct,
  reviewProduct,
};
