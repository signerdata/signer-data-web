import { Box, Button, Card, Container, Stack, TextField, Typography } from '@mui/material'
import { Session } from '@supabase/supabase-js'
import { useState } from 'react'
import Payments from './Payments'

function Settings({ session }: { session: Session }) {
  const [domain, setDomain] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 2, marginBottom: 6 }}>
      <Stack gap={2}>
        <Card>
          <Stack flexDirection="row" gap={6}>
            <Stack gap={1} width="300px" minWidth="300px">
              <Typography variant="h3">Profile</Typography>
              <Typography variant="body2" color="text.secondary">
                Manage your personal information and account details.
              </Typography>
            </Stack>
            <Stack gap={1} flex={1}>
              <Stack direction="row" gap={1}>
                <Typography variant="body1" fontWeight={700}>
                  Username:
                </Typography>
                <Typography>{session.user.user_metadata.username}</Typography>
              </Stack>
              <Stack direction="row" gap={1}>
                <Typography variant="body1" fontWeight={700}>
                  Email:
                </Typography>
                <Typography>{session.user.email}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Card>

        <Card>
          <Stack flexDirection="row" gap={6}>
            <Stack gap={1} width="300px" minWidth="300px">
              <Typography variant="h3">App</Typography>
              <Typography variant="body2" color="text.secondary">
                Configure your application settings and domain preferences.
              </Typography>
            </Stack>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              <Typography variant="body2" fontWeight={700} color="text.secondary">
                Domain
              </Typography>
              <Stack direction="row" gap={2} alignItems="center">
                <TextField
                  value={domain}
                  placeholder="app.example.com"
                  onChange={(e) => setDomain(e.target.value)}
                  required
                  inputProps={{
                    pattern: '^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\\.[a-zA-Z]{2,}$',
                    title: 'Please enter a valid domain (e.g., example.com)',
                  }}
                  fullWidth
                />
                {error && (
                  <Typography variant="body1" color="error">
                    {error}
                  </Typography>
                )}
                <Button type="submit" variant="contained" size="small">
                  Save
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Card>

        <Payments />
      </Stack>
    </Container>
  )
}

export default Settings
