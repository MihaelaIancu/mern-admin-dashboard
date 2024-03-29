import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import authRoutes from "./routes/auth.js";
import salesRoutes from "./routes/sales.js";
import mysql from "mysql";
import cookieParser from "cookie-parser";

// data imports
import User from "./models/User.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
  dataTransactionArray,
} from "./data/index.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";

// CONFIGURATION
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(
//   cors({
//     credentials: true,
//     origin: "https://mern-admin-client-k3kn.onrender.com",
//   })
// );

// ROUTES
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 9000;

// MONGOOSE SETUP
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server Port: ${PORT} && MongoDB is connected`)
    );
    // only add data one time
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);
  })
  .catch((error) => console.log(`${error} did not connect`));

// MYSQL SETUP
// const con = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: process.env.MYSQL_PASSW,
//   database: "test",
// });

// con.getConnection(function (err) {
//   if (err) throw err;
//   console.log("MySQL is connected");

// con.query(
//   "INSERT INTO transactions (_id, userId, cost, products) VALUES ?",
//   [dataTransactionArray],
//   function (err) {
//     if (err) throw err;
//     console.log("Data has been inserted");
//   }
// );
// });
