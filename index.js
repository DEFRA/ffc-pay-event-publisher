const { PublishEvent, PublishEventBatch } = require('./app/v1/event-publisher')
const { EventPublisher } = require('./app/v2')

module.exports = {
  PublishEvent,
  PublishEventBatch,
  EventPublisher
}
