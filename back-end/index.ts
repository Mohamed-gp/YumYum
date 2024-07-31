import express from "express";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/usersRouter";
import productsRouter from "./routes/productsRouter";
import categoriesRouter from "./routes/categoriesRouter";
import adminRouter from "./routes/adminRouter";
import connectToDB from "./lib/connectToDB";
import dotenv from "dotenv";
import cors from "cors";
import { notFound, errorHandler } from "./middlewares/errors";
import cookieParser from "cookie-parser";
import cartRouter from "./routes/cartRouter";
import checkoutRouter from "./routes/checkoutRouter";
// import commentsRouter from "./routes/commentsRouter";
import { verifyToken } from "./middlewares/verifyToken";

dotenv.config();
const app = express();

connectToDB(process.env.MONGODB_URI as string);
const PORT = 3000;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin:
      process.env.NODE_ENV == "developement"
        ? "http://localhost:5173"
        : "https://swiftbuy1.netlify.app",
    // origin: "http://localhost:5173",
    credentials: true,
  })
);

app.listen(PORT, () => {
  console.log("server listening on port ", PORT);
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/cart", cartRouter);
app.use("/api/admin", adminRouter);
app.use("/api/checkout", checkoutRouter);
// app.use("/api/comments", commentsRouter);

app.use(notFound);
app.use(errorHandler);
