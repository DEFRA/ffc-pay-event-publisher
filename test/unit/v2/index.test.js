const v2 = require('../../../app/v2')
const { EventPublisher } = require('../../../app/v2/event-publisher/event-publisher')

describe('app/v2/index', () => {
  test('should export EventPublisher as a class', () => {
    expect(typeof v2.EventPublisher).toBe('function')
    expect(v2.EventPublisher).toBe(EventPublisher)
  })
})
