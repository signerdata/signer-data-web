import { Box, Button, Card, Link, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../config/supabase'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const message = location.state?.message

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError(undefined)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        throw error
      }
      await supabase.auth.getSession()
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login')
    }
  }

  return (
    <Box maxWidth="sm" sx={{ marginX: 'auto', padding: 2 }}>
      <Card component="form" onSubmit={handleLogin}>
        <Stack gap={3}>
          <Typography variant="h1" align="center">
            Sign in
          </Typography>
          {message && <Typography color="success.main">{message}</Typography>}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight={700} color="text.secondary">
              Email
            </Typography>
            <TextField
              type="email"
              value={email}
              placeholder="satoshi@bitcoin.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight={700} color="text.secondary">
              Password
            </Typography>
            <TextField
              type="password"
              value={password}
              placeholder="Your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>
          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" size="large">
            Sign in
          </Button>
          <Typography variant="body2" color="text.secondary" align="center">
            Don't have an account?{' '}
            <Link
              variant="body2"
              onClick={() => navigate('/register')}
              sx={{ border: 'none', cursor: 'pointer' }}
            >
              Sign up
            </Link>
          </Typography>
        </Stack>
      </Card>
    </Box>
  )
}

export default Login
