export async function loginApi({ email, password }) {
  // Simulated network delay
  await new Promise((resolve) => setTimeout(resolve, 150))
  if (!email || !password) {
    throw new Error('Missing credentials')
  }
  return { message: 'Welcome back' }
}
