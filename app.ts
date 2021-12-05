import express from 'express'
import mongoose from 'mongoose'
import config from './utils/config'
import middleware from './utils/middleware'
import logger from './utils/logger'
import path from 'path'
import cors from 'cors'
import router from './controllers/api'
const app = express()
const port = 3001

if(config.MONGODB_URI){
  mongoose.connect(config.MONGODB_URI)
  .then( () => {
    logger.info('connected to MongoDB')
  })
  .catch((error:any) => {
    logger.info('error connecting to MongoDB:', error.message)
  })
}

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json())
app.use('/api', router);

app.use('/*', (request:any, response:any) => {
  response.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

