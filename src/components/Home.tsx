import { Box, Stack, Typography } from '@mui/material'

function Home() {
  return (
    <Box sx={{ width: '100%', paddingX: 2, paddingY: 16, border: 1, borderColor: 'divider' }}>
      <Stack gap={4}>
        <Typography variant="h1" color="primary" align="center">
          Title
        </Typography>
        <Typography variant="h2" color="text.secondary" align="center">
          Subtitle
        </Typography>
      </Stack>
    </Box>
  )
}

export default Home
