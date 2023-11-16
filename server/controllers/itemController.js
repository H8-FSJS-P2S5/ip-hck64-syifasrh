const { Item } = require('../models');

class ItemController {
    static async getAllItem(req, res, next) {
        try {
            const items = await Item.findAll();
            res.status(200).json(items);
        } catch (error) {
            next(error);
        }
    };

    static async getItemById(req, res, next) {
        try {
            const { id } = req.params;
            const item = await Item.findByPk(id);
            if (!item) {
                throw { name: "notFound", message: "Item Not Found"}
            };

            res.status(200).json(item);
        } catch (error) {
            next(error);
        }
    };
};

module.exports = ItemController;