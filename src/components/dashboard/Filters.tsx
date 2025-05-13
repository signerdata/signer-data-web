import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography
} from '@mui/material'
import { Application } from '../settings/types'

export function Filters({
  activityFilter,
  onActivityChange,
  currentApplication,
  applications,
  onApplicationChange
}: {
  activityFilter: string
  onActivityChange: (value: string) => void
  currentApplication: string
  applications: Application[]
  onApplicationChange: (value: string) => void
}) {
  return (
    <Stack
      gap={3}
      borderRight="1px solid"
      borderColor="divider"
      padding={2}
      minWidth="300px"
      width="300px"
    >
      <Stack gap={2}>
        <Typography variant="h4" fontWeight={700}>
          Your applications
        </Typography>
        <FormControl fullWidth>
          <Select 
            value={currentApplication}
            onChange={(event: SelectChangeEvent) => onApplicationChange(event.target.value)}
          >
            {applications.map((application: Application, index: number) => (
              <MenuItem key={index} value={application.domain}>{application.domain}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Typography variant="h4" fontWeight={700}>
        Filters
      </Typography>
      <Stack gap={2}>
        <Stack gap={1}>
          <Typography variant="body1">
            Chain
          </Typography>
          <Box
            sx={{
              padding: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              backgroundColor: 'background.paper',
            }}
          >
            <Typography variant="body1">
              BASE
            </Typography>
          </Box>
        </Stack>
        <FormControl fullWidth>
          <Stack gap={1}>
            <Typography variant="body1">
              Users activity
            </Typography>
            <Select 
              value={activityFilter} 
              onChange={(event: SelectChangeEvent) => onActivityChange(event.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="any">Transacted any time</MenuItem>
              <MenuItem value="30d">Transacted last month</MenuItem>
              <MenuItem value="7d">Transacted last week</MenuItem>
              <MenuItem value="none">No transactions</MenuItem>
            </Select>
          </Stack>
        </FormControl>
      </Stack>

      {/*
      <Stack gap={2}>
        <FormControl fullWidth>
          <InputLabel>Balance Range</InputLabel>
          <Select value={balanceRange} label="Balance Range" onChange={onBalanceRangeChange}>
            <MenuItem value="all">Custom Range</MenuItem>
            <MenuItem value="low">Low Balance</MenuItem>
            <MenuItem value="medium">Medium Balance</MenuItem>
            <MenuItem value="high">High Balance</MenuItem>
          </Select>
        </FormControl>
        {balanceRange === 'all' && (
          <Box>
            <Typography gutterBottom>Custom Balance Range (USDC)</Typography>
            <Box sx={{ paddingX: 1 }}>
              <Slider
                value={customRange}
                onChange={onCustomRangeChange}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
                step={100}
              />
            </Box>
          </Box>
        )}
        <Typography variant="body2" color="text.secondary">
          {getBalanceRangeLabel(balanceRange, customRange)}
        </Typography>
      </Stack>

      <FormControl fullWidth>
        <InputLabel>Tokens Known</InputLabel>
        <Select
          multiple
          value={selectedTokens}
          label="Tokens Known"
          onChange={onTokenChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Box>
          )}
        >
          {AVAILABLE_TOKENS.map((token) => (
            <MenuItem key={token.symbol} value={token.symbol}>
              {token.name} ({token.symbol})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedTokens.length > 0 && (
        <Typography variant="body2" color="text.secondary">
          Holding: {selectedTokens.join(', ')}
        </Typography>
      )}
      */}
    </Stack>
  )
}
