import React, { useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Alert from "@mui/material/Alert";

import { useTitle } from "react-use";

import { useHistory } from "react-router-dom";

function Login({ setAuth, setUser }) {
  let history = useHistory();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [alertState, setAlertState] = useState({
    type: "error",
    status: false,
    message: "",
  });
  const [errorState, setErrorState] = useState({
    emailValid: false,
    emailMsg: "",
    passwordValid: false,
    passwordMsg: "",
  });

  useTitle("Login Screen");

  async function submit(e) {
    e.preventDefault();
    if (checkForm()) {
      try {
        let {
          data: { user, token },
        } = await axios.post("/api/auth/login", formData);

        localStorage.setItem("token", token);
        setAuth(true);
        setUser(user);
        setAlertState({
          type: "success",
          status: true,
          message: "Login Successful",
        });

        setTimeout(goHome, 1250);
      } catch (e) {
        console.log(e.response.data);
        setAlertState({
          type: "error",
          status: true,
          message: e.response.data.message,
        });
      }
    }
  }

  function goHome() {
    history.push("/");
  }

  function change(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function checkForm() {
    let validForm = true;
    let tempFormData = formData;

    if (tempFormData.email === "" || !emailCheck(tempFormData.email)) {
      setErrorState((prevState) => ({
        ...prevState,
        emailValid: true,
        emailMsg: "Please enter a valid email",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        emailValid: false,
        emailMsg: "",
      }));
    }

    if (tempFormData.password === "") {
      setErrorState((prevState) => ({
        ...prevState,
        passwordValid: true,
        passwordMsg: "Password field is empty",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        passwordValid: false,
        passwordMsg: "",
      }));
    }

    if (!validForm) {
      setAlertState({
        type: "error",
        status: true,
        message: "Login Form Error, Please Check!",
      });
    } else {
      setAlertState({
        type: "",
        status: false,
        message: "",
      });
    }

    return validForm;
  }

  function emailCheck(email) {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Grid className={"d-flex justify-content-center mt-3"}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {alertState.status ? (
            <Alert id="alert" severity={alertState.type}>
              {alertState.message}
            </Alert>
          ) : (
            <></>
          )}
          <Typography component="h1" variant="h5">
            Login to your account
          </Typography>

          <Box component="form" noValidate onSubmit={submit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={change}
                  error={errorState.emailValid}
                  helperText={errorState.emailMsg}
                  autoFocus
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
                  autoComplete="password"
                  onChange={change}
                  error={errorState.passwordValid}
                  helperText={errorState.passwordMsg}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              id="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account? Click here to register.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
}

export default Login;
