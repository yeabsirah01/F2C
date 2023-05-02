//dependencies

const dotenv = require("dotenv");
require("express-async-errors");
const { clientURL } = require("./URI");
const express = require("express");
const connectDB = require("./db/connect");
const path = require("path");

//security dependencies

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

//app initialization

const app = express();
const PORT = process.env.PORT || 5000;
// app.use(bodyParser.json({ limit: "1mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//Routes
app.use(function (req, res, next) {
  console.log(req.header("Origin"));
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Type"
  );
  res.header("Content-Type", "multipart/form-data");

  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const waitlistRouter = require("./routes/WaitlistRoute");

//middle wares

const errorHandlerMiddleware = require("./middleware/error-handler");
const authorizationMiddleware = require("./middleware/authorization");
const notFoundMiddleware = require("./middleware/not-found");

app.use(xss());
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: clientURL }));
dotenv.config({ path: "./config.env" });

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome" });
});

app.use(express.static("public"));

//routes

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/waitlist", waitlistRouter);
app.use("/api/v1/users", authorizationMiddleware, userRouter);
// authorizationMiddleware

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

app.use(function (req, res, next) {
  console.log(req.header("Origin"));
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Content-Type", "multipart/form-data");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

const start = async () => {
  try {
    await connectDB(process.env.DATABASE_LOCAL).then(() =>
      console.log("DB connection successful!")
    );
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
