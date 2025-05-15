import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAddress } from 'viem'
import { API_URL, APPLICATION_ID } from '../config/variables'

const LOADING_MESSAGES = [
  'Based data incoming...',
  'Calculating blockchain magic...',
  'Summoning digital spirits...',
  'Decoding the matrix...',
  'Counting onchain sheep...',
  'Almost there, just a few more blocks...',
]

function Home() {
  const navigate = useNavigate()

  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [error, setError] = useState<string>()
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0)

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
    if (e.target.value === '') {
      setProfile(null)
      setError(undefined)
    }
  }

  const handleSearch = async () => {
    if (!isAddress(address)) {
      setError('Enter a valid address')
      return
    }
    setError(undefined)
    setIsLoading(true)
    setProfile(null)

    const messageInterval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length)
    }, 5000)

    try {
      const response = await fetch(`${API_URL}/api/v1/signers/${address}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          applicationId: APPLICATION_ID,
        }),
      })
      if (!response.ok) {
        throw new Error()
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
    <>
      <Box sx={{ width: '100%', paddingY: 6, borderBottom: 1, borderColor: 'divider' }}>
        <Stack marginX={14} gap={8} flexDirection="row" justifyContent="center">
          <Stack gap={4} flex={1}>
            <Typography variant="h1" fontSize="110px !important" color="primary">
              Real-time onchain profiles
            </Typography>
          </Stack>
          <Card sx={{ backgroundColor: 'background.paper', flex: 1 }}>
            <Stack direction="column" gap={3}>
              <Typography variant="h3" align="center">
                Get the onchain profile of a BASE address
              </Typography>
              <TextField
                fullWidth
                value={address}
                onChange={handleAddressChange}
                error={!!error}
                placeholder="0x..."
              />
              {error && (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}
              <Button
                variant="contained"
                onClick={handleSearch}
                disabled={isLoading}
                fullWidth
                size="large"
              >
                Search
              </Button>
              {isLoading && (
                <Stack flexDirection="row" gap={2} alignItems="center" justifyContent="center">
                  <CircularProgress size={24} color="inherit" />
                  <Typography variant="body1" color="text.secondary">
                    {LOADING_MESSAGES[loadingMessageIndex]}
                  </Typography>
                </Stack>
              )}
              {address && profile && (
                <Box
                  component="pre"
                  className="scrollable-content"
                  sx={{
                    overflow: 'auto',
                    maxHeight: '400px',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    padding: 2,
                  }}
                >
                  {JSON.stringify(profile, null, 2)}
                </Box>
              )}
            </Stack>
          </Card>
        </Stack>
      </Box>
      <Container maxWidth="lg" sx={{ padding: 4 }}>
        <Stack gap={4} justifyContent="center" alignItems="center">
          <Typography variant="h2" color="text.secondary" align="center">
            Data-driven growth for web3 applications. Onchain profiles for logged in users.
            Dashboards for admins to track and analyze all the data filtering by profile metrics.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{ width: '400px', height: '100px', fontSize: '32px', borderRadius: 6 }}
            onClick={() => navigate('/register')}
          >
            Get started
          </Button>
        </Stack>
      </Container>
    </>
  )
}

export default Home
