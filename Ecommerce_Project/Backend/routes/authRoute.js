import express from "express";
import {
  registerController,
  loginController,
  testController,
  updateProfileController,
} from "../controllers/userController.js";
import { isAdmin, requireSIgnIn } from "../middlewares/auth.js";

const router = express.Router();

//Register
router.post("/register", registerController);

//Login
router.post("/login", loginController);

//test router
router.get("/test", requireSIgnIn, isAdmin, testController)

// user auth route
router.get("/user-auth", requireSIgnIn, (req,res) => {
  res.status(200).send({ ok : true });
})

// admin auth route
router.get("/user-admin", requireSIgnIn,isAdmin, (req,res) => {
  res.status(200).send({ ok : true });
})

//update profile
router.put("/profile", requireSIgnIn, updateProfileController)

export default router;
