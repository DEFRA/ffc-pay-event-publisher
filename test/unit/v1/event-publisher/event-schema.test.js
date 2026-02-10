const validateEvent = require('../../../../app/v1/event-publisher/event-schema')

describe('validateEvent', () => {
  let consoleLogSpy

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
  })

  test('should return true for a valid event', () => {
    const validEvent = {
      name: 'test-event',
      properties: {
        id: '123',
        checkpoint: 'start',
        status: 'success',
        action: {
          type: 'create',
          message: 'Event created',
          data: { key: 'value' }
        }
      }
    }
    expect(validateEvent(validEvent)).toBe(true)
    expect(consoleLogSpy).not.toHaveBeenCalled()
  })

  test('should return false and log error for an invalid event (missing required field)', () => {
    const invalidEvent = {
      properties: {
        id: '123',
        checkpoint: 'start',
        status: 'success',
        action: {
          type: 'create',
          message: 'Event created'
        }
      }
    }
    expect(validateEvent(invalidEvent)).toBe(false)
    expect(consoleLogSpy).toHaveBeenCalledWith('Event validation error', expect.any(Object))
  })

  test('should return false and log error for an invalid event (wrong type)', () => {
    const invalidEvent = {
      name: 123, // should be string
      properties: {
        id: '123',
        checkpoint: 'start',
        status: 'success',
        action: {
          type: 'create',
          message: 'Event created'
        }
      }
    }
    expect(validateEvent(invalidEvent)).toBe(false)
    expect(consoleLogSpy).toHaveBeenCalledWith('Event validation error', expect.any(Object))
  })
})
