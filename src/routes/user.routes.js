import { Router } from "express";
import { createUser, getUsers, getUser, updatePassword } from "../controllers/users.controller.js";
import { isAdmin, isModerator, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";
import { paymentPremium } from "../middlewares/payment.js";

const router = Router();

router.get("/listusers", [verifyToken, isAdmin] ,getUsers);

router.get("/:userId", [verifyToken] ,getUser);

router.post("/create", [verifyToken, isAdmin, checkExistingUser], createUser);

router.post("/create-checkout-session", [verifyToken]);


export default router;