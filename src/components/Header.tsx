import { AppBar, Box, Button, Stack, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { Session } from '@supabase/supabase-js'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.png'
import { supabase } from '../config/supabase'

function Header({ session }: { session: Session | null }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
      navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ marginBottom: 0 }}>
      <Toolbar sx={{ gap: 2 }}>
        <Box width="300px">
          <Stack
            direction="row"
            gap={1}
            alignItems="center"
            onClick={() => navigate('/')}
            sx={{ cursor: 'pointer' }}
          >
            <img src={Logo} alt="SignerData" width={42} height={42} style={{ borderRadius: 16 }} />
            <Typography variant="h2">SignerData</Typography>
          </Stack>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {session && (
            <Tabs value={location.pathname} onChange={(_, value) => navigate(value)}>
              <Tab label="Dashboard" value="/dashboard" />
              <Tab label="Settings" value="/settings" />
            </Tabs>
          )}
        </Box>
        <Box
          sx={{
            width: '300px',
            display: 'flex',
            gap: 2,
            justifyContent: 'flex-end',
          }}
        >
          {session ? (
            <Button variant="contained" sx={{ width: '130px' }} size="small" onClick={handleLogout}>
              Sign out
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                sx={{ width: '130px' }}
                size="small"
                onClick={() => navigate('/login')}
              >
                Sign in
              </Button>
              <Button
                variant="contained"
                sx={{ width: '130px' }}
                size="small"
                onClick={() => navigate('/register')}
              >
                Sign up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
