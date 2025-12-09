import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from '../LoginForm'
import { loginApi } from '../../api/auth'

jest.mock('../../api/auth')

describe('LoginForm integration', () => {
  it('shows success message', async () => {
    loginApi.mockResolvedValueOnce({ message: 'Welcome back' })
    render(<LoginForm />)

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'secret')
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))

    expect(await screen.findByText(/welcome back/i)).toBeInTheDocument()
  })

  it('shows error message when api rejects', async () => {
    loginApi.mockRejectedValueOnce(new Error('Invalid credentials'))
    render(<LoginForm />)

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'wrong')
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument()
  })
})
