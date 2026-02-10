const eventSchema = require('../../../../app/v2/event-publisher/event-schema')

describe('eventSchema', () => {
  test('should validate a valid event', () => {
    const validEvent = {
      type: 'create',
      source: 'system',
      subject: 'user123',
      data: { key: 'value' }
    }
    const result = eventSchema.validate(validEvent)
    expect(result.error).toBeUndefined()
    expect(result.value).toEqual(validEvent)
  })

  test('should invalidate an event missing required fields', () => {
    const invalidEvent = {
      source: 'system',
      data: { key: 'value' }
    }
    const result = eventSchema.validate(invalidEvent)
    expect(result.error).toBeDefined()
  })

  test('should validate an event with optional fields omitted', () => {
    const validEvent = {
      type: 'update',
      source: 'api'
    }
    const result = eventSchema.validate(validEvent)
    expect(result.error).toBeUndefined()
  })
})
