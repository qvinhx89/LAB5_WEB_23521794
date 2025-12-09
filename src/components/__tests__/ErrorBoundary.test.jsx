import { render, screen } from '@testing-library/react'
import ErrorBoundary from '../ErrorBoundary'

function Bomb() {
  throw new Error('Boom!')
}

describe('ErrorBoundary', () => {
  let consoleError

  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleError.mockRestore()
  })

  it('renders fallback when child throws', () => {
    render(
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <Bomb />
      </ErrorBoundary>
    )

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
  })
})
