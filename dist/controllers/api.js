"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// missing api calls to mongodb to get existing lists
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../utils/config"));
const API_KEY = config_1.default.API_KEY;
// import MarketoListType from '../my-module'
const marketoList_1 = __importDefault(require("../models/marketoList"));
// import Coin from '../models/coin'
const router = express_1.default.Router();
// search API to Polygon.io for list of coins
router.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('query', req.query[0]);
    const searchTerm = req.query[0];
    const limit = 10;
    const url = `https://api.polygon.io/v3/reference/tickers?market=crypto&search=${searchTerm}&active=true&sort=ticker&limit=${limit}`;
    try {
        const polygonReturn = yield axios_1.default.get(url, {
            headers: { Authorization: `Bearer ${API_KEY}`
            }
        });
        const polygonResults = polygonReturn.data.results;
        console.log('api results', polygonResults);
        let coinNames = [];
        polygonResults === null || polygonResults === void 0 ? void 0 : polygonResults.forEach(({ ticker, name, base_currency_name, base_currency_symbol }) => coinNames.push({ ticker, name, base_currency_name, base_currency_symbol }));
        console.log('new arr', coinNames);
        return res.json(coinNames);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            body: 'oops, something went wrong with the search!'
        });
    }
}));
// search API to Polygon.io for specific coin information
router.get('/coin/:coinID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coinTicker = req.params.coinID.toUpperCase();
    const date = (new Date()).toISOString().split('T')[0];
    console.log('date', date);
    const url = `https://api.polygon.io/v1/open-close/crypto/${coinTicker}/USD/${date}?adjusted=true`;
    try {
        const polygonReturn = yield axios_1.default.get(url, {
            headers: { Authorization: `Bearer ${API_KEY}`
            }
        });
        const polygonResults = polygonReturn.data;
        console.log('api results', polygonResults);
        let coinInfo = {
            symbol: polygonResults.symbol.split('-')[0],
            day: polygonResults.day.split('T')[0],
            open: polygonResults.open,
            close: polygonResults.close
        };
        console.log('new coin obj', coinInfo);
        return res.json(coinInfo);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            body: 'oops, something went wrong with the search!'
        });
    }
}));
// search API to Polygon.io for specific coin news
router.get('/coinNews/:coinID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coinTicker = req.params.coinID;
    const url = `https://api.polygon.io/v2/reference/news?ticker=${coinTicker}&limit=5`;
    try {
        const polygonReturn = yield axios_1.default.get(url, {
            headers: { Authorization: `Bearer ${API_KEY}`
            }
        });
        const polygonResults = polygonReturn.data.results;
        console.log('api results', polygonResults);
        let coinNews = [];
        polygonResults === null || polygonResults === void 0 ? void 0 : polygonResults.forEach(({ title, author, article_url, description, keywords }) => coinNews.push({ title, author, article_url, description, keywords }));
        console.log('coin news obj', coinNews);
        return res.json(coinNews);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            body: 'oops, something went wrong with the search!'
        });
    }
}));
router.get('/myList/refresh/:listID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listID = req.params.listID;
    if (listID === '') {
        return res.status(400).json({
            body: 'oops, something went wrong with loading!'
        });
    }
    const marketoList = yield marketoList_1.default.findOne({ url: listID });
    if (marketoList) {
        let coins = marketoList.coins;
        let updatedCoinList = [];
        for (const coin of coins) {
            const coinTicker = coin.ticker.toUpperCase();
            const date = (new Date()).toISOString().split('T')[0];
            const url = `https://api.polygon.io/v1/open-close/crypto/${coinTicker}/USD/${date}?adjusted=true`;
            try {
                const polygonReturn = yield axios_1.default.get(url, {
                    headers: { Authorization: `Bearer ${API_KEY}`
                    }
                });
                const polygonResults = polygonReturn.data;
                let coinInfo = {
                    name: coin.name,
                    ticker: coin.ticker,
                    date: date,
                    last_price: polygonResults.close,
                };
                console.log('info', coinInfo);
                updatedCoinList.push(coinInfo);
                console.log('list', updatedCoinList);
            }
            catch (err) {
                console.log(err);
                res.status(400).json({
                    body: 'oops, something went wrong with the search!'
                });
            }
        }
        console.log('updatelist', updatedCoinList);
        return res.json(updatedCoinList);
    }
    else {
        return res.status(400).json({
            body: 'oops, something went wrong fetching from db'
        });
    }
}));
// api call to MongoDB to get list
router.get('/myList/:listID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listID = req.params.listID;
    if (listID === '') {
        return res.status(400).json({
            body: 'oops, something went wrong with loading!'
        });
    }
    console.log('BE the list', listID);
    const marketoList = yield marketoList_1.default.findOne({ url: listID });
    if (marketoList) {
        let returnData = {
            url: listID,
            coins: marketoList.coins
        };
        return res.json(returnData);
    }
    else {
        return res.status(400).json({
            body: 'oops, something went wrong fetching from db'
        });
    }
}));
router.post('/myList/:listID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listID = req.params.listID;
    const list = new marketoList_1.default({
        url: listID,
        coins: []
    });
    try {
        list.save();
    }
    catch (e) {
        console.log(e);
    }
    res.json(list);
}));
router.put('/myList/:listID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listID = req.params.listID;
    const updatedList = req.body.data;
    yield marketoList_1.default.findOneAndUpdate({ url: listID }, { coins: updatedList }, {
        new: true
    });
    return res.json('success!');
}));
exports.default = router;
