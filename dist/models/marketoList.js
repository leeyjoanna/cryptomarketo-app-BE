"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MarketoListSchema = new mongoose_1.Schema({
    url: {
        type: String,
        required: true
    },
    coins: [{
            name: String,
            ticker: String,
            date: String,
            last_price: Number
        }]
});
const MarketoList = (0, mongoose_1.model)('MarketoList', MarketoListSchema);
exports.default = MarketoList;
