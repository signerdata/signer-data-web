import { Box, Button, Card, Link, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../config/supabase'

function Register() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError(undefined)
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            username: username,
          },
        },
      })
      if (error) {
        throw error
      }
      navigate('/login', { state: { message: 'Check your email to confirm your account.' } })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign up')
    }
  }

  return (
    <Box maxWidth="sm" sx={{ marginX: 'auto', marginTop: 8, padding: 2 }}>
      <Card component="form" onSubmit={handleRegister}>
        <Stack direction="column" gap={3}>
          <Typography variant="h1">Sign up</Typography>

          {error && <Typography color="error">{error}</Typography>}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" fontWeight={700} color="text.secondary">
              Username
            </Typography>
            <TextField
              value={username}
              placeholder="Satoshi"
              onChange={(e) => setUsername(e.target.value)}
              required
              inputProps={{ minLength: 5, maxLength: 20 }}
            />
          </Box>
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
              placeholder="Your passworda"
              onChange={(e) => setPassword(e.target.value)}
              required
              inputProps={{ minLength: 6 }}
            />
          </Box>
          <Button type="submit" variant="contained" size="large">
            Sign up
          </Button>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link
              variant="body2"
              onClick={() => navigate('/login')}
              sx={{ border: 'none', cursor: 'pointer' }}
            >
              Sign in
            </Link>
          </Typography>
        </Stack>
      </Card>
    </Box>
  )
}

export default Register
