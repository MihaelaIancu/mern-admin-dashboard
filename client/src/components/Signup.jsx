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
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  const theme = useTheme();
  return (
    <Typography
      paddingBottom={"15px"}
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
  const history = useNavigate();

  const [roles, setRoles] = React.useState({
    admin: true,
    superadmin: false,
    user: false,
  });

  const [inputs, setInputs] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [admins, setAdmins] = React.useState({
    role: "",
  });

  const theme = useTheme();

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    setRoles((prevState) => ({
      // ...prevState,
      [e.target.name]: e.target.checked,
    }));

    handleRoles();
  };

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5001/auth/signup", {
        name: inputs.firstName + " " + inputs.lastName,
        email: inputs.email,
        password: inputs.password,
        phoneNumber: inputs.phoneNumber,
        role: admins.admin,
      })
      .catch((err) => console.log(err));

    const data = await res.data;

    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    //send http request
    sendRequest().then(() => history("/login"));
  };

  const handleRoles = () => {
    roles.user ? setAdmins({ role: "user" }) : setAdmins({ role: "admin" });
    roles.superadmin
      ? setAdmins({ role: "superadmin" })
      : setAdmins({ role: "admin" });
  };

  const { admin, superadmin, user } = roles;

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
                value={inputs.firstName}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={inputs.lastName}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={inputs.email}
                type={"email"}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={inputs.password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={inputs.phoneNumber}
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phone-number"
                onChange={handleChange}
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
