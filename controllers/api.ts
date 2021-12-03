// api calls to mongodb to get existing lists
import express, { Response } from 'express'
import axios from 'axios'
import config from '../utils/config'
const API_KEY = config.API_KEY
import MarketoList from '../models/marketoList'
import { PolygonData, CoinName } from '../my-module'
import { URLSearchParams } from 'url'
// import Coin from '../models/coin'

const router = express.Router()

router.get('/', (req, res) => {
    return res.json('blank url')
})

// router.get('/search', async (req, res) => {
//     console.log('query', req.query[0])
//     const searchTerm = req.query[0];
//     const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${API_KEY}`;
//     try{
//         const vantageResult = await axios.get(url, {
//             headers:{'User-Agent': 'request'
//             }
//         });
//         console.log('result', vantageResult.data.bestMatches)
//         // iterate through result, cut out and organize information into cleaner objects (typed for FE)
//         // then push those into array and send that over to FE to use
//         return res.json(vantageResult.data.bestMatches)
//     } catch (err) {
//         console.log(err);
//         res.status(400).json({
//             body: 'oops, something went wrong with the search!'
//         })
//     }    
// })

 // changing to polygon API, use search param for search drop down, click only, on click run individual ticker API to load coin page
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
  // axios
  //   .get( url, {
  //     headers: { Authorization: `Bearer ${API_KEY}` 
  //     }
  //   })
  //   .then(result => {
  //     // console.log('search result', result)
  //     console.log(result.data.results)
  //     let listNames:polygonName = []
  //     result.data.results.forEach(({ name }) => listNames.push(name))
  //     // res.json(result.data.businesses)
  //   })
  //   .catch(e => console.log(e));

})

router.get('/:url', (req, res) => {
    const url = req.params.url
    console.log('backend', url)

    if (url===""){
        return res.json('empty')
    }
    return res.json('stuff')
})


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