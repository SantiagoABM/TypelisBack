import mercadopago from "mercadopago";
import { HOST } from "../config";

module.exports = {
    createOrder: async(req, res) =>{
        mercadopago.configure({
            access_token:"TEST-1036639336386664-053109-79a6428cc34153ec9b81d4add31ba721-1387440190",
        });
        const result = await mercadopago.preferences.create({
            items: [
                {
                    title: "Premium",
                    unit_price: 20,
                    currency_id: "PEN",
                    quantity: 1,
                }
            ],
            back_urls:{
                success: `${HOST}/peliculas/success`,
                failure: `${HOST}/peliculas/failure`,
                pending: `${HOST}/peliculas/pending`,
            },
            notification_url: "https://5af2-179-6-166-76.eu.ngrok.io/webhook",
        });
        console.log(result)
        res.send(result.body)
    },
    receiveWebhook: async(req, res) =>{
        console.log(req.query);
        res.send("webhook");
    },

}