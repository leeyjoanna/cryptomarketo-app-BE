// missing api calls to mongodb to get existing lists
import express, { Response } from 'express'
import axios from 'axios'
import config from '../utils/config'
const API_KEY = config.API_KEY
import MarketoList from '../models/marketoList'
import { PolygonData, CoinName, PolygonCoinData, CoinInfo, PolygonCoinNews, CoinNews } from '../my-module'
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
  const coinTicker = req.params.coinID;
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
      symbol: polygonResults.symbol,
      day: polygonResults.day,
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

// search API to Polygon.io for specific coin information
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

// api call to MongoDB to get list
router.get('/myList/:uuid', async (req, res) => {
    const url = req.params.uuid

    if (url === ''){
        let returnData = {
          url: '',
          name: '',
          title: 'create your new list',
        }
        console.log(returnData)
        return res.json(returnData)
      }

    const marketoList = await MarketoList.findOne({url: url})

    if(marketoList){
        let returnData = {
          url: url,
          name: marketoList.name,
          title: marketoList.title,
        }
        // console.log(returnData)
        return res.json(returnData)
      }
      else {
        return res.status(400).json({
          body: 'no url bud'
        })
      }
})

export default router