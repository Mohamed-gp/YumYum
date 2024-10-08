import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getFeaturedProducts,
  toggleWishlist,
  getAllProductsListed,
} from "../controllers/productsController";
import { verifyToken, verifyAdmin } from "../middlewares/verifyToken";
import upload from "../config/multer";
import verifyObjectId from "../middlewares/verifyObjectId";
import demoAdmin from "../middlewares/demoAdmin";

const router = Router();

router
  .route("/")
  .get(getAllProducts)
  .post(
    upload.single("image"),
    verifyToken,
    verifyAdmin,
    demoAdmin,
    createProduct
  );
router.route("/listed").get(getAllProductsListed);
router.route("/featured").get(getFeaturedProducts);
router.route("/wishlist").post(verifyToken, toggleWishlist);
router
  .route("/:id")
  .get(verifyObjectId, getProduct)
  .delete(verifyToken, verifyAdmin, demoAdmin, deleteProduct);

export default router;
