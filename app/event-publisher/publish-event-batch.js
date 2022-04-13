const validateEvent = require('./event-schema')
const { trackEvents } = require('../app-insights')
const { publishEventBatchRequest } = require('../messaging')

class PublishEventBatch {
  constructor (config) {
    this.appInsights = config.appInsights
    this.config = config
  }

  async sendEvents (eventMessages) {
    if (validateEvent(eventMessages)) {
      await publishEventBatchRequest(eventMessages, this.config)
      trackEvents(eventMessages)
    }
  }
}

module.exports = PublishEventBatch
