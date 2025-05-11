import { Box, Card, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { ProfileLogin } from './types';

function StatsCards({
  data
}: {
  data: ProfileLogin[]
}) {
  const { totalUsers, averageUsers, maxSessions } = useMemo(() => {
    // Group by date and calculate max sessions per date
    const sessionsByDate = data.reduce((acc, login) => {
      const date = new Date(login.date).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += login.count;
      return acc;
    }, {} as Record<string, number>);
    
    const totalUsers = data.length > 0 ? data.reduce((acc, login) => acc + login.count, 0) : 0;
    const averageUsers = data.length > 0 ? Math.round(totalUsers / data.length) : 0;
    const maxSessions = Object.values(sessionsByDate).length > 0 
      ? Math.max(...Object.values(sessionsByDate))
      : 0;
    
    return { totalUsers, averageUsers, maxSessions }
  }, [data])

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
      <Card>
        <Stack gap={1}>
        </Stack>
      </Card>
      <Card>
        <Stack gap={1}>
          <Typography variant="h3" sx={{ mb: 1 }}>
            Sessions
          </Typography>
          <Stack direction="row" gap={4} alignItems="center" justifyContent="space-around">
            <Stack alignItems="center">
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Monthly sessions
              </Typography>
              <Typography variant="h2">{totalUsers.toLocaleString()}</Typography>
            </Stack>
            <Stack alignItems="center">
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Daily average
              </Typography>
              <Typography variant="h2">{averageUsers.toLocaleString()}</Typography>
            </Stack>
            <Stack alignItems="center">
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Monthly peak
              </Typography>
              <Typography variant="h2">{maxSessions.toLocaleString()}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Box>
  )
}

export default StatsCards;
