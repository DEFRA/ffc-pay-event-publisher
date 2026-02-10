const createMessage = require('../../../../app/v1/messaging/create-message')

describe('createMessage', () => {
  test('should create a message object with body, type, source, and spread options', () => {
    const body = { data: 'test' }
    const type = 'event'
    const source = 'checkpoint'
    const options = { priority: 'high', id: '123' }

    const result = createMessage(body, type, source, options)

    expect(result).toEqual({
      body,
      type,
      source,
      priority: 'high',
      id: '123'
    })
  })

  test('should handle empty options', () => {
    const body = 'simple body'
    const type = 'simple'
    const source = 'simple'

    const result = createMessage(body, type, source)

    expect(result).toEqual({
      body,
      type,
      source
    })
  })
})
