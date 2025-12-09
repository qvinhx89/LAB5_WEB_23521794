import { Suspense, lazy } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorBoundary from './components/ErrorBoundary'
import LoginForm from './components/LoginForm'
import Cart from './pages/Cart'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import './App.css'

const AdminPanel = lazy(() => import('./pages/AdminPanel'))

function App() {
  return (
    <div className="app-shell">
      <header className="header">
        <h1>React Advanced Lab</h1>
        <div className="persona">
          <div className="persona-name">Pham Quoc Vinh</div>
          <div className="persona-id">ID: 23521794</div>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/admin"
              element={
                <ErrorBoundary fallback={<p role="alert">Admin failed to load.</p>}>
                  <AdminPanel />
                </ErrorBoundary>
              }
            />
            <Route
              path="/login"
              element={
                <ErrorBoundary fallback={<p role="alert">Login failed.</p>}>
                  <LoginForm />
                </ErrorBoundary>
              }
            />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App
