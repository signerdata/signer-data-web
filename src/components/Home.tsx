import { Box, Button, Card, CircularProgress, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { isAddress } from 'viem'

const LOADING_MESSAGES = [
  'Based data incoming...',
  'Calculating blockchain magic...',
  'Summoning digital spirits...',
  'Decoding the matrix...',
  'Counting onchain sheep...',
  'Almost there, just a few more blocks...',
]

function Home() {
  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [error, setError] = useState('')
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0)

  const handleSearch = async () => {
    if (!isAddress(address)) {
      setError('Enter a valid address')
      return
    }

    setError('')
    setIsLoading(true)
    setProfile(null)

    const messageInterval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length)
    }, 5000)

    try {
      const response = await fetch(`http://localhost:3000/api/v1/signers/${address}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setProfile(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile data')
    } finally {
      clearInterval(messageInterval)
      setIsLoading(false)
    }
  }

  return (
    <Box sx={{ width: '100%', paddingX: 2, paddingY: 16, borderBottom: 1, borderColor: 'divider' }}>
      <Stack gap={4} maxWidth="800px" margin="0 auto">
        <Stack gap={4}>
          <Typography variant="h1" color="primary" align="center">
            Signer Data
          </Typography>
          <Typography variant="h2" color="text.secondary" align="center">
            Explore on-chain profiles
          </Typography>
        </Stack>

        <Stack direction="row" gap={2}>
          <TextField
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={!!error}
            placeholder="0x..."
          />
          {error && <Typography variant="body2" color="error">{error}</Typography>}
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={isLoading}
            sx={{ width: '130px' }}
          >
            Search
          </Button>
        </Stack>
        {isLoading && (
          <Card sx={{ padding: 4, textAlign: 'center' }}>
            <Stack flexDirection="row" gap={2} alignItems="center" justifyContent="center">
              <CircularProgress size={24} color="inherit" />
              <Typography variant="body1" color="text.secondary">
                {LOADING_MESSAGES[loadingMessageIndex]}
              </Typography>
            </Stack>
          </Card>
        )}
        {profile && (
          <Card sx={{ padding: 2 }}>
            <Box
              component="pre"
              className="scrollable-content"
              sx={{
                overflow: 'auto',
                maxHeight: '400px',
                fontFamily: 'monospace',
                padding: 2,
              }}
            >
              {JSON.stringify(profile, null, 2)}
            </Box>
          </Card>
        )}
      </Stack>
    </Box>
  )
}

export default Home
