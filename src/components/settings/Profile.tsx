import { Card, Stack, Typography } from "@mui/material";
import { Session } from "@supabase/supabase-js";

function Profile({
  session
}: {
  session: Session
}) {
  return (
    <Card>
      <Stack flexDirection="row" gap={10}>
        <Stack gap={1} width="300px" minWidth="300px">
          <Typography variant="h3">Profile</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your personal information and account details.
          </Typography>
        </Stack>
        <Stack gap={1} flex={1}>
          <Stack direction="row" gap={1}>
            <Typography variant="body1" fontWeight={700}>
              Username:
            </Typography>
            <Typography>{session.user.user_metadata.username}</Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <Typography variant="body1" fontWeight={700}>
              Email:
            </Typography>
            <Typography>{session.user.email}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  )
}

export default Profile;
