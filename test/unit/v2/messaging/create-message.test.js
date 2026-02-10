const { createMessage } = require('../../../../app/v2/messaging/create-message')

jest.mock('uuid')

const { v4: uuidv4 } = require('uuid')

describe('createMessage', () => {
  beforeEach(() => {
    uuidv4.mockReturnValue('mock-uuid')
    jest.spyOn(global, 'Date').mockImplementation(() => ({
      toISOString: () => '2023-01-01T00:00:00.000Z'
    }))
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('should create a message with required fields', () => {
    const event = {
      type: 'create',
      source: 'system'
    }

    const result = createMessage(event)

    expect(result).toEqual({
      body: {
        specversion: '1.0',
        type: 'create',
        source: 'system',
        id: 'mock-uuid',
        time: '2023-01-01T00:00:00.000Z',
        subject: undefined,
        datacontenttype: 'text/json',
        data: undefined
      },
      type: 'create',
      source: 'system'
    })
    expect(uuidv4).toHaveBeenCalled()
  })

  test('should include subject and data if provided', () => {
    const event = {
      type: 'update',
      source: 'api',
      subject: 'user123',
      data: { key: 'value' }
    }

    const result = createMessage(event)

    expect(result.body.subject).toBe('user123')
    expect(result.body.data).toEqual({ key: 'value' })
  })
})
