import { Box, Card, Typography } from '@mui/material'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import { ProfileLogin } from './types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TimeScale)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 20,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      stacked: true,
      ticks: {
        stepSize: 1,
        precision: 0,
      },
      grid: {
        display: false,
      },
    },
    x: {
      type: 'time' as const,
      time: {
        unit: 'day' as const,
        displayFormats: {
          day: 'MMM d',
        },
      },
      min: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString(),
      max: new Date().toISOString(),
      stacked: true,
      ticks: {
        maxRotation: 0,
        minRotation: 0,
      },
      grid: {
        display: false,
      },
    },
  },
}

function DailyActiveUsersChart({ data }: { data: ProfileLogin[] }) {
  const chartData = useMemo(() => {
    // Group by date and count distinct addresses
    const groupedData = data.reduce(
      (acc, login) => {
        const date = new Date(login.date).toISOString().split('T')[0]
        if (!acc[date]) {
          acc[date] = new Set()
        }
        acc[date].add(login.address)
        return acc
      },
      {} as Record<string, Set<string>>
    )

    const chartData = {
      labels: Object.keys(groupedData).map((date) => date),
      datasets: [
        {
          label: 'Daily active users',
          data: Object.keys(groupedData).map((date) => groupedData[date].size),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1,
        },
      ],
    }
    console.log(chartData)
    return chartData
  }, [data])

  return (
    <Card>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Daily Active Users
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {data.length > 0 ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <Typography color="text.secondary">No data available</Typography>
        )}
      </Box>
    </Card>
  )
}

export default DailyActiveUsersChart
