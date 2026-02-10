const { validateEvent } = require('../../../../app/v2/event-publisher/validate-event')

describe('validateEvent', () => {
  let consoleErrorSpy

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  test('should return true for a valid event', () => {
    const validEvent = {
      type: 'create',
      source: 'system'
    }
    expect(validateEvent(validEvent)).toBe(true)
    expect(consoleErrorSpy).not.toHaveBeenCalled()
  })

  test('should return false and log error for an invalid event', () => {
    const invalidEvent = {
      source: 'system'
      // missing type
    }
    expect(validateEvent(invalidEvent)).toBe(false)
    expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid event', expect.any(Object))
  })
})
