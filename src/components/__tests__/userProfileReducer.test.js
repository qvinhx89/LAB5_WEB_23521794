import { initialState, userProfileReducer } from '../UserProfile'

describe('userProfileReducer FSM', () => {
  it('starts idle and moves to loading', () => {
    const next = userProfileReducer(initialState, { type: 'FETCH_INIT' })
    expect(next.status).toBe('loading')
    expect(next.error).toBeNull()
  })

  it('allows success only from loading', () => {
    const loading = { status: 'loading', data: null, error: null }
    const success = userProfileReducer(loading, {
      type: 'FETCH_SUCCESS',
      payload: { name: 'Alice' }
    })
    expect(success.status).toBe('resolved')
    expect(success.data).toEqual({ name: 'Alice' })

    const invalid = userProfileReducer(initialState, {
      type: 'FETCH_SUCCESS',
      payload: { name: 'Alice' }
    })
    expect(invalid).toBe(initialState)
  })

  it('allows failure only from loading', () => {
    const loading = { status: 'loading', data: null, error: null }
    const failure = userProfileReducer(loading, {
      type: 'FETCH_FAILURE',
      error: new Error('boom')
    })
    expect(failure.status).toBe('rejected')
    expect(failure.error).toBeInstanceOf(Error)

    const invalid = userProfileReducer(initialState, {
      type: 'FETCH_FAILURE',
      error: new Error('boom')
    })
    expect(invalid).toBe(initialState)
  })
})
