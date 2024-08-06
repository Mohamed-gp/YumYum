import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import Cart from "../models/Cart";
import { authRequest } from "../interfaces/authInterface";

// const getAllCarts = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     console.log("test");
//     const carts = await Cart.find();

//     return res
//       .status(200)
//       .json({ data: carts, message: "fetched successfull" });
//   } catch (error: any) {
//     next(error);
//   }
// };

const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  const { productId, userId, quantity, sizeName, extrasName } = req.body;

  try {
    if (!sizeName) {
      return res
        .status(400)
        .json({ data: null, message: "you must pick a size" });
    }
    // {
    //   userId: '66aa541a080f789503627b8c',
    //   productId: '66aea0d21c5c15d2e46c60da',
    //   sizeName: 'Medium',
    //   extrasName: [ 'Pepperoni', 'Extra Cheese' ],
    //   quantity: 1
    // }
    let user = await User.findById(userId).populate({
      path: "cart",
      populate: {
        path: "product",
        model: "Product",
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    let cart = await Cart.findOne({
      user: userId,
      product: productId,
      sizeName,
      extrasName,
    }).populate("product");

    if (cart) {
      quantity ? (cart.quantity = quantity) : cart.quantity++;
      await cart.save();
    } else {
      cart = await Cart.create({
        user: userId,
        product: productId,
        quantity: quantity || 1,
        sizeName,
        extrasName,
      });
      cart = await Cart.findById(cart._id).populate("product");
      user.cart.push(cart._id);
      await user.save();
    }
    user = await User.findById(userId).populate({
      path: "cart",
      populate: {
        path: "product",
        model: "Product",
      },
    });

    return res
      .status(200)
      .json({ message: "Added successfully to cart", data: user.cart });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

const deleteFromCart = async (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cartId, userId } = req.params;

    if (userId !== req.user.id) {
      return res.status(403).json({
        data: null,
        message: "Access denied, you must be the user himself",
      });
    }
    let cart = await Cart.findById(cartId).populate("product");

    if (cart.user != req.user.id) {
      return res.status(400).json({
        message: "Access denied, you must be the user himself",
      });
    }
    if (!cart) {
      return res.status(400).json({
        message: "This product doesn't exist in the cart",
        data: null,
      });
    }

    await Cart.findOneAndDelete({
      _id: cartId,
    });

    let user = await User.findById(userId).populate({
      path: "cart",
      populate: {
        path: "product",
        model: "Product",
      },
    });

    user.cart = user.cart.filter((ele: any) => cartId !== ele._id.toString());
    await user.save();

    return res
      .status(200)
      .json({ message: "Removed successfully from the cart", data: user.cart });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

export { addToCart, deleteFromCart };
