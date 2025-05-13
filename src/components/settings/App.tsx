import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Application } from "./types";

function App({
  session
}: {
  session: Session
}) {
  const [domain, setDomain] = useState('')
  const [error, setError] = useState<string>()
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/dashboard/applications`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setApplications(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setApplications([]);
      }
    };
    fetchData();
  }, [session])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError(undefined)
      const response = await fetch(`http://localhost:3000/api/v1/dashboard/applications`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain: domain
        }),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error();
      }
      const newApplication = await response.json()
      setApplications([...applications, newApplication])
      setDomain('')
      setError(undefined)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create an application')
    }
  }

  return (
    <Card>
    <Stack flexDirection="row" gap={10}>
      <Stack gap={1} width="300px" minWidth="300px">
        <Typography variant="h3">Projects</Typography>
        <Typography variant="body2" color="text.secondary">
          Configure your project settings and domain preferences.
        </Typography>
      </Stack>
      <Stack
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: '100%', flexDirection: 'column', gap: 2 }}
      >
        <Stack gap={1}>
          {applications.map((application: Application) => (
            <Stack
              key={application.domain}
              flexDirection="row"
              gap={2}
              padding={2}
              justifyContent="space-between"
              border="1px solid"
              borderColor="divider"
              borderRadius={2}
            >
              <Typography variant="body1">
                {application.domain}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {application.id}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <Stack gap={1}>
          <Typography variant="body2" fontWeight={700} color="text.secondary">
            Add domain
          </Typography>
          <Stack direction="row" gap={2} alignItems="center">
            <TextField
              value={domain}
              placeholder="app.example.com"
              onChange={(e) => setDomain(e.target.value)}
              required
              inputProps={{
                pattern: '^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\\.[a-zA-Z]{2,}$',
                title: 'Enter a valid domain (e.g., example.com)',
              }}
              error={error !== undefined}
              fullWidth
            />
            <Button type="submit" variant="contained" size="large" sx={{ width: '200px' }}>
              Create project
            </Button>
          </Stack>
          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Stack>
  </Card>
  )
}

export default App
