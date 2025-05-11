import { Box, Stack } from '@mui/material'
import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import DailyActiveUsersChart from './DailyActiveUsersChart'
import DailySessionsChart from './DailySessionsChart'
import StatsCards from './StatsCards'
import { ProfileLogin } from './types'

function Dashboard({ session }: { session: Session }) {
  const [data, setData] = useState<ProfileLogin[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:3000/api/v1/dashboard/1', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Stack direction="row" width="100%">
      <Stack gap={2} padding={2} flexGrow={1}>
        <StatsCards data={data} />
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <DailyActiveUsersChart data={data} />
          <DailySessionsChart data={data} />
        </Box>
      </Stack>
    </Stack>
  )
}

export default Dashboard
