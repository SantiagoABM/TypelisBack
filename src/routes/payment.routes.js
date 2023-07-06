import { Router } from "express";
import { verifyToken } from "../middlewares/authJwt";
import { createOrder, receiveWebhook } from "../controllers/payment.controller";

const router = Router();

router.post('/create-order', [verifyToken], createOrder);

router.get('/success', [verifyToken], (req, res) => res.send('success') );

router.get('/failure', [verifyToken], (req, res) => res.send('failure') );

router.get('/pending', [verifyToken], (req, res) => res.send('pending') );


router.post('/webhook', [verifyToken], receiveWebhook);

export default router;