const validateEvent = require('./event-schema')
const { trackEvents } = require('../app-insights')
const { publishEventBatchRequest } = require('../messaging')

class PublishEventBatch {
  constructor (config) {
    this.appInsights = config.appInsights
    this.config = config
  }

<<<<<<< HEAD
  async sendEvents (eventMessages) {    
    if (eventMessages.every(eventMessage => validateEvent(eventMessage)) {
=======
  async sendEvents (eventMessages) {
    if (validateEvent(eventMessages)) {
>>>>>>> origin/main
      await publishEventBatchRequest(eventMessages, this.config)
      trackEvents(eventMessages)
    }
  }
}

module.exports = PublishEventBatch
