const midtransClient = require('midtrans-client');
const { nanoid } = require('nanoid');

class PaymentController {
    static async getMidtransToken(req, res, next) {
        try {
            // Create Snap API instance
            const snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });

            const orderId = `trx-os-${nanoid()}`;

            const parameter = {
                "transaction_details": {
                    "order_id": orderId,
                    "gross_amount": 10000
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "first_name": "budi",
                    "last_name": "pratama",
                    "email": "budi.pra@example.com",
                    "phone": "08111222333"
                }
            };
        } catch (error) {

        }
    }
}

module.exports = PaymentController;