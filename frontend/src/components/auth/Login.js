import React, { useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { checkForm } from "../common/checkForm";
import FormAlert from "../common/FormAlert";
import { useTitle } from "react-use";
import { useHistory } from "react-router-dom";
import {alertStateConst, loginFormDataConst, loginErrorStateConst} from "../common/constants";

function Login({ setAuth, setUser }) {
  let history = useHistory();
  const [formData, setFormData] = useState(loginFormDataConst);
  const [alertState, setAlertState] = useState(alertStateConst);
  const [errorState, setErrorState] = useState(loginErrorStateConst);

  useTitle("Login Screen");

  async function submit(e) {
    e.preventDefault();
    if (checkForm(formData,setErrorState,setAlertState)) {
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

        setTimeout(()=>(history.push("/")), 1250);
      } catch (e) {
        console.log(e);
        setAlertState({
          type: "error",
          status: true,
          message: e.response.data.message ,
        });
      }
    }
  }

  function change(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
          <FormAlert alertState={alertState}/>

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
                  name="passwordLogin"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                  onChange={change}
                  error={errorState.passwordLoginValid}
                  helperText={errorState.passwordLoginMsg}
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
