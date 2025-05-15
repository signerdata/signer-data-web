import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { Session } from '@supabase/supabase-js'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../config/variables'
import { Application } from '../settings/types'
import DailyActiveUsersChart from './DailyActiveUsersChart'
import DailySessionsChart from './DailySessionsChart'
import { Filters } from './Filters'
import StatsCards from './StatsCards'
import { ProfileLogin } from './types'

function Dashboard({ session }: { session: Session }) {
  const navigate = useNavigate()

  const [data, setData] = useState<ProfileLogin[]>([])
  const [activityFilter, setActivityFilter] = useState<string>('any')
  const [applications, setApplications] = useState<Application[]>([])
  const [currentApplication, setCurrentApplication] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/dashboard/applications`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        })
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const result = await response.json()
        setApplications(result)
        setCurrentApplication(result[0].domain)
      } catch (error) {
        console.error('Error fetching data:', error)
        setApplications([])
      }
    }
    fetchData()
  }, [session])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const application =
          applications.find((app) => app.domain === currentApplication) || applications[0]
        if (!application) {
          return
        }
        const response = await fetch(`${API_URL}/api/v1/dashboard/applications/${application.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
        setData([])
      }
    }
    fetchData()
  }, [applications, currentApplication])

  const filteredData = useMemo(() => {
    switch (activityFilter) {
      case 'all':
        return data
      case 'any':
        return data.filter((login) => login.profile.transactions.out.countAll > 0)
      case '30d':
        return data.filter((login) => login.profile.transactions.out.count30d > 0)
      case '7d':
        return data.filter((login) => login.profile.transactions.out.count7d > 0)
      case 'none':
        return data.filter((login) => login.profile.transactions.out.countAll === 0)
      default:
        return data
    }
  }, [data, activityFilter])

  if (applications.length === 0) {
    return (
      <Box maxWidth="sm" sx={{ marginX: 'auto', padding: 2 }}>
        <Card>
          <Stack gap={3}>
            <Typography variant="h1" align="center">
              No projects found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Create a new project from your settings page to get started.
            </Typography>
            <Button variant="contained" size="large" onClick={() => navigate('/settings')}>
              Go to settings
            </Button>
          </Stack>
        </Card>
      </Box>
    )
  }

  return (
    <Stack direction="row" width="100%">
      <Filters
        activityFilter={activityFilter}
        onActivityChange={setActivityFilter}
        currentApplication={currentApplication}
        applications={applications}
        onApplicationChange={setCurrentApplication}
      />
      <Stack gap={2} padding={2} flexGrow={1}>
        <StatsCards data={filteredData} />
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <DailyActiveUsersChart data={filteredData} />
          <DailySessionsChart data={filteredData} />
        </Box>
      </Stack>
    </Stack>
  )
}

export default Dashboard
