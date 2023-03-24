import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { cleanNotify, loginApi } from '../features/UserSlice';
import AlreadyLogged from '../customHook/AlreadyLogged';
import { useSnackbar } from 'notistack';

function Copyright(props) {
  return (
    <Box sx={{mt:3}}>
    <Typography variant="p"  color="text.secondary" align="center" {...props}>
        { "username: atuny0 & password: 9uQFF1Lh"}
    </Typography>
    </Box>
  );
}

const theme = createTheme();

export default function Login() {
  AlreadyLogged()
  const users=useSelector(state=>state.users)
  React.useEffect(()=>{
    if(users.error&&users.error.message&&users.error.status)
    enqueueSnackbar(users.error.message, { variant: users.error.status });
   return ()=>{
    dispatch(cleanNotify())
   }
  },[users])
  const { enqueueSnackbar } = useSnackbar();
  const dispatch =useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username= data.get('email')
    const password= data.get('password')
    if(username && password)
    dispatch(loginApi({username, password}))
    else{
      enqueueSnackbar("Please Fill all Fields.", { variant: "warning" });
    }

  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              defaultValue="atuny0"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              defaultValue="9uQFF1Lh"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="https://dummyjson.com/users" target="_blank" variant="body2">
                  {"Click for more users credentials"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}