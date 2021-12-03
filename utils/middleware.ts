import * as express from 'express'
import logger from './logger'

const requestLogger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req: express.Request, res: express.Response) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

const middleware = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}

export default middleware