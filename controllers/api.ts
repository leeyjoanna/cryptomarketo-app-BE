// missing api calls to mongodb to get existing lists
import express, { response, Response } from 'express'
import axios from 'axios'
import config from '../utils/config'
const API_KEY = config.API_KEY
// import MarketoListType from '../my-module'
import MarketoList from '../models/marketoList'
import { PolygonData, CoinName, PolygonCoinData, CoinInfo, PolygonCoinNews, CoinNews, CoinDB } from '../my-module'
import { URLSearchParams } from 'url'
// import Coin from '../models/coin'

const router = express.Router()

// search API to Polygon.io for list of coins
router.get('/search', async (req, res) => {
  console.log('query', req.query[0])
  const searchTerm = req.query[0];
  const limit = 10;
  const url = `https://api.polygon.io/v3/reference/tickers?market=crypto&search=${searchTerm}&active=true&sort=ticker&limit=${limit}`;
  try{
    const polygonReturn = await axios.get(url, {
        headers: { Authorization: `Bearer ${API_KEY}` 
        }
      });
    const polygonResults:PolygonData[] = polygonReturn.data.results;
    
    console.log('api results', polygonResults);
    let coinNames:CoinName[] = [];
    polygonResults?.forEach(({ ticker, name, base_currency_name, base_currency_symbol }) => coinNames.push({ticker, name, base_currency_name, base_currency_symbol}))
    console.log('new arr', coinNames);
    return res.json(coinNames)
  } catch (err) {
    console.log(err);
    res.status(400).json({
        body: 'oops, something went wrong with the search!'
    })
}    
})


// search API to Polygon.io for specific coin information
router.get('/coin/:coinID', async (req, res) => {
  const coinTicker = req.params.coinID.toUpperCase();
  const date = (new Date()).toISOString().split('T')[0]
  console.log('date', date)
  const url = `https://api.polygon.io/v1/open-close/crypto/${coinTicker}/USD/${date}?adjusted=true`;
  try{
    const polygonReturn = await axios.get(url, {
        headers: { Authorization: `Bearer ${API_KEY}` 
        }
      });
    const polygonResults:PolygonCoinData = polygonReturn.data;
    
    console.log('api results', polygonResults);
    let coinInfo:CoinInfo = {
      symbol: polygonResults.symbol.split('-')[0],
      day: polygonResults.day.split('T')[0],
      open: polygonResults.open,
      close: polygonResults.close
    }
    console.log('new coin obj', coinInfo);
    return res.json(coinInfo)
  } catch (err) {
    console.log(err);
    res.status(400).json({
        body: 'oops, something went wrong with the search!'
    })
}    
})

// search API to Polygon.io for specific coin news
router.get('/coinNews/:coinID', async (req, res) => {
  const coinTicker = req.params.coinID;

  const url = `https://api.polygon.io/v2/reference/news?ticker=${coinTicker}&limit=5`;
  try{
    const polygonReturn = await axios.get(url, {
        headers: { Authorization: `Bearer ${API_KEY}` 
        }
      });
    const polygonResults:PolygonCoinNews[] = polygonReturn.data.results;
    
    console.log('api results', polygonResults);
    let coinNews:CoinNews[] = []
    polygonResults?.forEach(({ title, author, article_url, description, keywords }) => coinNews.push({title, author, article_url, description, keywords}))
    console.log('coin news obj', coinNews);
    return res.json(coinNews)
  } catch (err) {
    console.log(err);
    res.status(400).json({
        body: 'oops, something went wrong with the search!'
    })
}    
})

router.get('/myList/refresh/:listID', async (req, res) => {
  const listID = req.params.listID;
  if (listID === ''){
    return res.status(400).json({
      body: 'oops, something went wrong with loading!'
    })
  }

  const marketoList = await MarketoList.findOne({url: listID})

  if(marketoList){
    let coins = marketoList.coins;
    let updatedCoinList:CoinDB[] = [];
    for (const coin of coins) {
      const coinTicker = coin.ticker.toUpperCase();
      const date = (new Date()).toISOString().split('T')[0]
      const url = `https://api.polygon.io/v1/open-close/crypto/${coinTicker}/USD/${date}?adjusted=true`;
      try{
        const polygonReturn = await axios.get(url, {
            headers: { Authorization: `Bearer ${API_KEY}` 
            }
          });
        const polygonResults:PolygonCoinData = polygonReturn.data;
        
        let coinInfo:CoinDB = {
          name: coin.name,
          ticker: coin.ticker,
          date: date,
          last_price: polygonResults.close,
        }
        console.log('info', coinInfo)
        updatedCoinList.push(coinInfo)
        console.log('list', updatedCoinList)
      } catch (err) {
        console.log(err);
        res.status(400).json({
            body: 'oops, something went wrong with the search!'
        })
      }
    }
    console.log('updatelist', updatedCoinList)
    return res.json(updatedCoinList)
  }
  else {
    return res.status(400).json({
      body: 'oops, something went wrong fetching from db'
    })
  }
})

// api call to MongoDB to get list
router.get('/myList/:listID', async (req, res) => {
  const listID = req.params.listID

  if (listID === ''){
    return res.status(400).json({
      body: 'oops, something went wrong with loading!'
    })
  }
    
  console.log('BE the list', listID)
  const marketoList = await MarketoList.findOne({url: listID})

  if(marketoList){
    let returnData = {
      url: listID,
      coins: marketoList.coins
    }
    return res.json(returnData)
  }
  else {
    return res.status(400).json({
      body: 'oops, something went wrong fetching from db'
    })
  }
})

router.post('/myList/:listID', async (req, res) => {
  const listID = req.params.listID;

  const list = new MarketoList({
    url: listID,
    coins: []
  })

  try{
    list.save()
  } catch (e){
    console.log(e)
  }

  res.json(list)
})

router.put('/myList/:listID', async (req,res) => {
  const listID = req.params.listID;
  const updatedList:CoinDB[] = req.body.data;

  await MarketoList.findOneAndUpdate({url:listID}, {coins: updatedList}, {
    new: true
  })

  return res.json('success!')

})

export default router