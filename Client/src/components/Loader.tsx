import { CircularProgress, Box, Typography } from "@mui/material"

function Loader({msg}: {msg: string}) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
        <Typography variant="h6">{msg}</Typography>
      </Box>
  )
}

export default Loader