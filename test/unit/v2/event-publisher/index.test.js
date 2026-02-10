const eventPublisher = require('../../../../app/v2/event-publisher')
const { EventPublisher } = require('../../../../app/v2/event-publisher/event-publisher')

describe('app/v2/event-publisher/index', () => {
  test('should export EventPublisher as a class', () => {
    expect(typeof eventPublisher.EventPublisher).toBe('function')
    expect(eventPublisher.EventPublisher).toBe(EventPublisher)
  })
})
