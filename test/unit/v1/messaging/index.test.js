const messaging = require('../../../../app/v1/messaging')
const publishEventRequest = require('../../../../app/v1/messaging/publish-event-request')
const publishEventBatchRequest = require('../../../../app/v1/messaging/publish-event-batch-request')

describe('app/v1/messaging/index', () => {
  test('should export publishEventRequest as a function', () => {
    expect(typeof messaging.publishEventRequest).toBe('function')
    expect(messaging.publishEventRequest).toBe(publishEventRequest)
  })

  test('should export publishEventBatchRequest as a function', () => {
    expect(typeof messaging.publishEventBatchRequest).toBe('function')
    expect(messaging.publishEventBatchRequest).toBe(publishEventBatchRequest)
  })
})
