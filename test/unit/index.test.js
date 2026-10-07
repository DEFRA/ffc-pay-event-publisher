const index = require('../../index')
const { PublishEvent, PublishEventBatch } = require('../../app/v1/event-publisher')
const { EventPublisher } = require('../../app/v2')
const { closeSenders } = require('../../app/messaging/service-bus')

describe('index', () => {
  test('should export PublishEvent as a class', () => {
    expect(typeof index.PublishEvent).toBe('function')
    expect(index.PublishEvent).toBe(PublishEvent)
  })

  test('should export PublishEventBatch as a class', () => {
    expect(typeof index.PublishEventBatch).toBe('function')
    expect(index.PublishEventBatch).toBe(PublishEventBatch)
  })

  test('should export EventPublisher as a class', () => {
    expect(typeof index.EventPublisher).toBe('function')
    expect(index.EventPublisher).toBe(EventPublisher)
  })

  test('should export closeSenders as a function', () => {
    expect(typeof index.closeSenders).toBe('function')
    expect(index.closeSenders).toBe(closeSenders)
  })
})
