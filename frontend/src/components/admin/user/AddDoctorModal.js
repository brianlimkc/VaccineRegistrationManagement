import FormAlert from "../../common/FormAlert";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import ProfileForm from "../../auth/ProfileForm";
import React, { useState } from "react";
import axios from "axios";
import { Box, Container, Grid, Typography } from "@mui/material";
import { checkForm } from "../../common/checkForm";
import { styled } from "@mui/system";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 600,
  bgcolor: "white",
  border: "2px solid #000",
  p: 2,
  px: 4,
  pb: 3,
};

function AddDoctorModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nric: "",
    password: "",
    password2: "",
    dateOfBirth: "",
    contactNum: "",
    staffType: "",
    qualificationType: "",
    isStaff: true,
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
        await axios.post("/api/auth/register", formData);

        setAlertState({
          type: "success",
          status: true,
          message: "New Doctor Added Successfully",
        });

        setTimeout(() => {
          closeModal();
        }, 1250);
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

  function closeModal() {
    setAlertState({
      type: "error",
      status: false,
      message: "",
    });
    setFormData({
      name: "",
      email: "",
      nric: "",
      password: "",
      password2: "",
      dateOfBirth: "",
      contactNum: "",
      staffType: "",
      qualificationType: "",
      isStaff: true,
    });
    setErrorState({
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
    handleClose();
  }

  return (
    <StyledModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={open}
      onClose={handleClose}
      BackdropComponent={Backdrop}
    >
      <Box sx={style}>
        <Container component="main" maxWidth="xs">
          <Grid className={"d-flex justify-content-center mt-3"}>
            <Box
              sx={{
                marginTop: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FormAlert alertState={alertState} />

              <Typography component="h1" variant="h5">
                Add a new Doctor
              </Typography>
              <ProfileForm
                formData={formData}
                setFormData={setFormData}
                errorState={errorState}
                submit={submit}
                addDocFlag={true}
                editFlag={false}
                closeModal={closeModal}
              />
            </Box>
          </Grid>
        </Container>
      </Box>
    </StyledModal>
  );
}

export default AddDoctorModal;
