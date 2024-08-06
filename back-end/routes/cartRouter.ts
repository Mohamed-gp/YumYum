import { Router } from "express";
import {
  addToCart,
  deleteFromCart,
  // getAllCarts,
} from "../controllers/cartController";
import { verifyAdmin, verifyToken } from "../middlewares/verifyToken";

const router = Router();

// router.route("/").get(verifyToken, verifyAdmin, getAllCarts);
router.route("/add").post(addToCart);
router.route("/delete/:userId/:cartId").delete(verifyToken, deleteFromCart);

export default router;
