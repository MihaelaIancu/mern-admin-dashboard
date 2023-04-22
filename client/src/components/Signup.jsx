import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  useTheme,
  FormLabel,
  FormGroup,
  FormControl,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

function Copyright(props) {
  const theme = useTheme();
  return (
    <Typography
      variant="body2"
      color={theme.palette.secondary.light}
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/home">
        HOME
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Signup = () => {
  const [state, setState] = React.useState({
    admin: true,
    superadmin: false,
    user: false,
  });

  const theme = useTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleChange = (e) => {
    setState({
      //   ...state,
      [e.target.name]: e.target.checked,
    });
  };

  const { admin, superadmin, user } = state;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
          <LockOutlined />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          color={theme.palette.secondary.light}
        >
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phone-number"
              />
            </Grid>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">Assign responsibility</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={admin}
                      onChange={handleChange}
                      name="admin"
                    />
                  }
                  label="admin"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={superadmin}
                      onChange={handleChange}
                      name="superadmin"
                    />
                  }
                  label="superadmin"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={user}
                      onChange={handleChange}
                      name="user"
                    />
                  }
                  label="user"
                />
              </FormGroup>
            </FormControl>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: theme.palette.secondary.light }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default Signup;
