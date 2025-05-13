import { Box, Card, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { ProfileLogin } from './types';

function StatsCards({
  data
}: {
  data: ProfileLogin[]
}) {
  const { totalUsers, averageUsers, maxUsers } = useMemo(() => {
    // Group by date and count distinct addresses
    const groupedData = data.reduce((acc, login) => {
      const date = new Date(login.date).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = new Set();
      }
      acc[date].add(login.address);
      return acc;
    }, {} as Record<string, Set<string>>);
    
    let totalUsers = 0;
    let averageUsers = 0;
    let maxUsers = 0;
    if (data.length > 0) {
      totalUsers = new Set(data.map(login => login.address)).size;
      averageUsers = Number((data.length / 30).toFixed(2));
      maxUsers = Math.max(...Object.values(groupedData).map((set) => set.size));
    }
    return { totalUsers, averageUsers, maxUsers }
  }, [data])

  const { totalSessions, averageSessions, maxSessions } = useMemo(() => {
    // Group by date and calculate max sessions per date
    const groupedData = data.reduce((acc, login) => {
      const date = new Date(login.date).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += login.count;
      return acc;
    }, {} as Record<string, number>);
    
    let totalSessions = 0;
    let averageSessions = 0;
    let maxSessions = 0;
    if (data.length > 0) {
      totalSessions = data.reduce((acc, login) => acc + login.count, 0);
      averageSessions = Number((totalSessions / 30).toFixed(2));
      maxSessions = Math.max(...Object.values(groupedData));
    }
    return { totalSessions, averageSessions, maxSessions }
  }, [data])

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
      <Card>
        <Stack gap={1}>
          <Typography variant="h3" sx={{ mb: 1 }}>
            Users
          </Typography>
          <Stack direction="row" gap={4} alignItems="center" justifyContent="space-around">
            <Stack alignItems="center" gap={1}>
              <Typography variant="h2">{totalUsers.toLocaleString()}</Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Monthly users
              </Typography>
            </Stack>
            <Stack alignItems="center" gap={1}>
              <Typography variant="h2">{averageUsers.toLocaleString()}</Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Daily average
              </Typography>
            </Stack>
            <Stack alignItems="center" gap={1}>
              <Typography variant="h2">{maxUsers.toLocaleString()}</Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Monthly peak
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Card>
      <Card>
        <Stack gap={1}>
          <Typography variant="h3" sx={{ mb: 1 }}>
            Sessions
          </Typography>
          <Stack direction="row" gap={4} alignItems="center" justifyContent="space-around">
            <Stack alignItems="center" gap={1}>
              <Typography variant="h2">{totalSessions.toLocaleString()}</Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Monthly sessions
              </Typography>
            </Stack>
            <Stack alignItems="center" gap={1}>
              <Typography variant="h2">{averageSessions.toLocaleString()}</Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Daily average
              </Typography>
            </Stack>
            <Stack alignItems="center" gap={1}>
              <Typography variant="h2">{maxSessions.toLocaleString()}</Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Monthly peak
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Box>
  )
}

export default StatsCards;
