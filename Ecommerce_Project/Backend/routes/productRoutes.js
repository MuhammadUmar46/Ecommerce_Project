import express from "express";
import { isAdmin, requireSIgnIn } from "../middlewares/auth.js";
import stripe from "stripe";(
  Stripe_Secret_Key
);

import {
  createProductController,
  deleteProductController,
  filterProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productListController,
  productPhotoController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";


const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSIgnIn,
  formidable(),
  createProductController
);

// update product
router.put(
  "/update-product/:pid",
  requireSIgnIn,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

// single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

// delete product
router.delete("/product-delete/:pid", deleteProductController);

// filter product
router.post("/product-filters", filterProductController);

// product count
router.get("/product-count", productCountController);

// product per page
router.get("/product-list/:page", productListController);

// stripe payment

router.get("/publishable-key", (req, res) => {
  res.json({
    publishable_key:
      Stripe_Publish_Key ,
  });
});


router.post("/create-payment-intent", async (req, res) => {
  try {
    const {name, price, email} = req.body
    let customer = await stripe.customers.list({ email: email, limit: 1 });

    if (customer.data.length === 0) {
      customer = await stripe.customers.create({
        name: name,
        email: email,
        address: {
          line1: "123 Main St",
          line2: "sukkur",
          city: "Cityville",
          state: "CA",
          postal_code: "12345",
          country: "US",
        },
      });
    } else {
      customer = customer.data[0];
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price * 100,
      currency: "usd",
      payment_method_types: ["card"],
      description: "Ecommerce - Exclusive Toy Store",
      customer: customer.id,
      shipping: {
        name: name,
        address: {
          line1: "123 Main St",
          city: "Cityville",
          state: "CA",
          postal_code: "12345",
          country: "US",
        },
      },
    });

    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




export default router;
