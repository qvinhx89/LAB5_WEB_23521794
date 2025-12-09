import { useEffect, useReducer, useRef } from 'react'

export const initialState = {
  status: 'idle',
  data: null,
  error: null
}

export function userProfileReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      if (state.status === 'loading') return state
      return { status: 'loading', data: null, error: null }
    case 'FETCH_SUCCESS':
      if (state.status !== 'loading') return state
      return { status: 'resolved', data: action.payload, error: null }
    case 'FETCH_FAILURE':
      if (state.status !== 'loading') return state
      return { status: 'rejected', data: null, error: action.error }
    default:
      return state
  }
}

const USER_ENDPOINT = 'https://jsonplaceholder.typicode.com/users/1'

export default function UserProfile() {
  const [state, dispatch] = useReducer(userProfileReducer, initialState)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    const controller = new AbortController()

    async function fetchProfile() {
      dispatch({ type: 'FETCH_INIT' })
      try {
        const response = await fetch(USER_ENDPOINT, { signal: controller.signal })
        if (!response.ok) {
          throw new Error('Failed to fetch profile')
        }
        const payload = await response.json()
        if (isMountedRef.current) {
          dispatch({ type: 'FETCH_SUCCESS', payload })
        }
      } catch (error) {
        if (controller.signal.aborted) return
        if (isMountedRef.current) {
          dispatch({ type: 'FETCH_FAILURE', error })
        }
      }
    }

    fetchProfile()

    return () => {
      isMountedRef.current = false
      controller.abort()
    }
  }, [])

  if (state.status === 'loading') {
    return <p>Loading user profile...</p>
  }

  if (state.status === 'rejected') {
    return <p role="alert">Failed to load profile: {state.error?.message}</p>
  }

  if (state.status === 'resolved' && state.data) {
    return (
      <div className="card">
        <h3>User Profile</h3>
        <p>Name: {state.data.name}</p>
        <p>Email: {state.data.email}</p>
        <p>Company: {state.data.company?.name}</p>
      </div>
    )
  }

  return <p>Idle: click reload to fetch.</p>
}
