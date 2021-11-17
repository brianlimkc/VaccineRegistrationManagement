import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormAlert from "../common/FormAlert";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import ProfileForm from "./ProfileForm";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { checkForm } from "../common/checkForm";
import { useHistory } from "react-router-dom";

function Registration({ setAuth, setUser }) {
  let history = useHistory();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nric: "",
    password: "",
    password2: "",
    dateOfBirth: "",
    contactNum: "",
  });

  const [alertState, setAlertState] = useState({
    type: "error",
    status: false,
    message: "",
  });

  const [errorState, setErrorState] = useState({
    nameValid: false,
    nameMsg: "",
    emailValid: false,
    emailMsg: "",
    nricValid: false,
    nricMsg: "",
    passwordValid: false,
    passwordMsg: "",
    password2Valid: false,
    password2Msg: "",
    contactValid: false,
    contactMsg: "",
    dobValid: false,
    dobMsg: "",
    staffValid: false,
    staffMsg: "",
    qualValid: false,
    qualMsg: "",
  });

  async function submit(e) {
    e.preventDefault();

    if (checkForm(formData, setErrorState, setAlertState)) {
      try {
        let {
          data: { user, token },
        } = await axios.post("/api/auth/register", formData);
        localStorage.setItem("token", token);
        setAuth(true);
        setUser(user);
        setAlertState({
          type: "success",
          status: true,
          message: "Registration Successful",
        });

        setTimeout(() => history.push("/login"), 1250);
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
          <FormAlert alertState={alertState} />

          <Typography component="h1" variant="h5">
            Sign up for a new account
          </Typography>

          <ProfileForm
            formData={formData}
            setFormData={setFormData}
            errorState={errorState}
            submit={submit}
            addDocFlag={false}
            editFlag={false}
          />

          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
}

export default Registration;
