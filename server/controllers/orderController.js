const { Order } = require('../models');
const axios = require('axios');

class OrderController {
    static async addOrder(req, res, next) {
        try {
            const { ItemId, city, province, address, quantity, shippingFee, totalPayment, paymentStatus } = req.body;
            const UserId = req.user.id;
            const order = await Order.create({ ItemId, city, province, address, quantity, shippingFee, totalPayment, paymentStatus, UserId });

            // midtrans code

            res.status(201).json(order);
        } catch (error) {
            next(error);
        }
    };

    static async updateOrder(req, res, next) {
        try {
            const { id } = req.params;
            const { quantity } = req.body;

            if (!quantity) {
                throw { name: "InvalidInput" }
            };

            const order = await Order.findByPk(id)
            if (!order) {
                throw { name: "notFound", message: "Order Not Found" }
            };

            await order.update({ quantity }, {
                where: { id }
            });

            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    };

    static async deleteOrder(req, res, next) {
        try {
            const { id } = req.params;
            const order = await Order.findByPk(id);

            if (!order) {
                throw { name: "notFound", message: `Order with id ${id} not found` }
            };

            await order.destroy({
                where: { id }
            });

            res.status(200).json({
                message: `Order with id ${id} successfuly deleted`
            });
        } catch (error) {
            next(error);
        }
    };

    static async getProvinces(req, res, next) {
        try {
            const { data } = await axios({
                method: 'GET',
                url: 'https://api.rajaongkir.com/starter/province',
                headers: { key: '2e2bdd315e5d005209ff5521ae40f472' }
            });

            const result = data.rajaongkir.results.map(el => {
                return {
                    ProvinceId: el.province_id,
                    province: el.province
                }
            });

            res.json(result);
        } catch (error) {
            console.log(error.response.data.rajaongkir.status);
            next(error);
        }
    };

    static async getCities(req, res, next) {
        try {
            // console.log(req.body);?

            if (!req.body?.province) {
                // throw err
            }

            const { data } = await axios.get(`https://api.rajaongkir.com/starter/city?province=${req.body.province}`, {
                headers: {
                    key: "f35d32d22e7cbba406509608c499380a"
                }
            })

            const result = data.rajaongkir.results.map(el => {
                return {
                    CityId: el.city_id,
                    ProvinceId: el.province_id,
                    province: el.province,
                    type: el.type,
                    city: el.city_name,
                    postalCode: el.postal_code
                }
            });

            res.json(result);
        } catch (error) {
            console.log(error.data);
            next(error);
        }
    };

    static async getCost(req, res, next) {
        try {
            let { destination, quantity } = req.body

            if (!quantity) quantity = 1

            const { data } = await axios.post("https://api.rajaongkir.com/starter/cost", {
                origin: "153",
                destination,
                weight: 1000 * quantity,
                courier: "jne"
            }, {
                headers: {
                    key: "f35d32d22e7cbba406509608c499380a"
                }
            })

            // const { data } = await axios({
            //     method: 'POST',
            //     url: 'https://api.rajaongkir.com/starter/cost',
            //     headers: { key: '2e2bdd315e5d005209ff5521ae40f472', 'content-type': 'application/x-www-form-urlencoded' },
            //     data: { origin: 153, destination: req.body.destination, weight: req.body.weight, courier: 'jne' }
            // });

            const result = data.rajaongkir.results[0].costs[1].cost[0] || 0;

            res.json(result);
        } catch (error) {
            next(error);
        }
    };
};

module.exports = OrderController;