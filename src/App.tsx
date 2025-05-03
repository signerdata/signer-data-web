import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AuthCallback from './components/AuthCallback'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import { supabase } from './config/supabase'

function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!session ? <Register /> : <Navigate to="/" />} />
        <Route path="/dashboard" element={session ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  )
}

export default App
