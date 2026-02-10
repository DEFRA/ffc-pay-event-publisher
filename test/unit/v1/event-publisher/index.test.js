const eventPublisher = require('../../../../app/v1/event-publisher')
const PublishEvent = require('../../../../app/v1/event-publisher/publish-event')
const PublishEventBatch = require('../../../../app/v1/event-publisher/publish-event-batch')

describe('app/v1/event-publisher/index', () => {
  test('should export PublishEvent as a class', () => {
    expect(typeof eventPublisher.PublishEvent).toBe('function')
    expect(eventPublisher.PublishEvent).toBe(PublishEvent)
  })

  test('should export PublishEventBatch as a class', () => {
    expect(typeof eventPublisher.PublishEventBatch).toBe('function')
    expect(eventPublisher.PublishEventBatch).toBe(PublishEventBatch)
  })
})
