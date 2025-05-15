import { Container, Stack } from '@mui/material'
import { Session } from '@supabase/supabase-js'
import App from './App'
import Payments from './Payments'
import Profile from './Profile'

function Settings({ session }: { session: Session }) {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 2, marginBottom: 6 }}>
      <Stack gap={2}>
        <Profile session={session} />
        <App session={session} />
        <Payments />
      </Stack>
    </Container>
  )
}

export default Settings
