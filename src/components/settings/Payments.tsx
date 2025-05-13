import { Button, Card, Link, Stack, Typography } from '@mui/material'
import { useState } from 'react'

type Payment = {
  date: string
  plan?: 'free' | 'standard'
  amount: number
  paid: boolean
  txHash?: string
}

const PAYMENTS: Payment[] = [
  {
    date: 'June 2025',
    amount: 199,
    paid: false,
  },
  {
    date: 'May 2025',
    plan: 'standard',
    amount: 199,
    paid: true,
    txHash: '0x1234...5678',
  },
  {
    date: 'April 2025',
    plan: 'standard',
    amount: 199,
    paid: true,
    txHash: '0x1234...5678',
  },
  {
    date: 'March 2025',
    plan: 'free',
    amount: 0,
    paid: true,
  },
  {
    date: 'February 2025',
    plan: 'free',
    amount: 0,
    paid: true,
  },
  {
    date: 'January 2025',
    plan: 'free',
    amount: 0,
    paid: true,
  },
]

function Payments() {
  const [plan, setPlan] = useState<'free' | 'paid'>('free')

  return (
    <Card>
      <Stack gap={6}>
        <Stack flexDirection="row" gap={10}>
          <Stack gap={1} width="300px" minWidth="300px">
            <Typography variant="h3">Subscription plans</Typography>
            <Typography variant="body2" color="text.secondary">
              View and manage your subscription.
            </Typography>
          </Stack>
          <Stack gap={2} flex={1}>
            <Stack direction="row" gap={3} width="100%">
              <Stack
                flex={1}
                sx={{
                  padding: 3,
                  border: '1px solid',
                  borderColor: plan === 'free' ? 'primary.main' : 'divider',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h5" fontWeight={700} color="primary.main">
                  Free
                </Typography>
                <Typography variant="body1">{Number(1000).toLocaleString()} users/month</Typography>
                <Stack direction="row" alignItems="flex-end" paddingY={2}>
                  <Typography variant="h2">0 USDC</Typography>
                  <Typography variant="body1" color="text.secondary">
                    /month
                  </Typography>
                </Stack>
                <Button
                  variant={plan === 'free' ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setPlan('free')}
                  disabled={plan === 'free'}
                >
                  {plan === 'free' ? 'Current Plan' : 'Select'}
                </Button>
              </Stack>
              <Stack
                flex={1}
                sx={{
                  padding: 3,
                  border: '1px solid',
                  borderColor: plan === 'paid' ? 'primary.main' : 'divider',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h5" fontWeight={700} color="primary.main">
                  Standard
                </Typography>
                <Typography variant="body1">{Number(10000).toLocaleString()} users/month</Typography>
                <Stack direction="row" alignItems="flex-end" paddingY={2}>
                  <Typography variant="h2">199 USDC</Typography>
                  <Typography variant="body1" color="text.secondary">
                    /month
                  </Typography>
                </Stack>
                <Button
                  variant={plan === 'paid' ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setPlan('paid')}
                  disabled={plan === 'paid'}
                >
                  {plan === 'paid' ? 'Current Plan' : 'Select'}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack flexDirection="row" gap={10}>
          <Stack gap={1} width="300px" minWidth="300px">
            <Typography variant="h3">Payments</Typography>
            <Typography variant="body2" color="text.secondary">
              View and manage your subscription and payment information.
            </Typography>
          </Stack>
          <Stack gap={2} flex={1}>
            <Stack gap={2}>
              {PAYMENTS.map((payment) => (
                <Stack
                  key={payment.date}
                  flexDirection="row"
                  gap={2}
                  padding={2}
                  alignItems="center"
                  justifyContent="space-between"
                  border="1px solid"
                  borderColor="divider"
                  borderRadius={2}
                >
                  <Typography variant="body1" color="text.secondary" flex={1}>
                    {payment.date}
                  </Typography>
                  <Link
                    href={`https://etherscan.io/tx/${payment.txHash}`}
                    target="_blank"
                    sx={{ flex: 1 }}
                  >
                    <Typography variant="body1">{payment.txHash}</Typography>
                  </Link>
                  <Typography variant="body1" flex={1}>
                    {payment.paid ? `${payment.amount} USDC` : `${plan === 'paid' ? 199 : 0} USDC`}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ width: '130px' }}
                    disabled={payment.paid}
                  >
                    {payment.paid
                      ? payment.plan === 'free'
                        ? 'Free'
                        : 'Paid'
                      : `Pay ${plan === 'paid' ? 199 : 0} USDC`}
                  </Button>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  )
}

export default Payments
