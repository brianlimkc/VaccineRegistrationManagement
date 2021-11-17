import FormAlert from "../../common/FormAlert";
import ProfileForm from "../../auth/ProfileForm";
import React, { useState } from "react";
import axios from "axios";
import { Box, Container, Grid, Typography } from "@mui/material";
import { checkForm } from "../../common/checkForm";
import { StyledModal, Backdrop, style, docFormDataConst, errorStateConst, alertStateConst} from "../../common/constants";

function AddDoctorModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState(docFormDataConst);
  const [alertState, setAlertState] = useState(alertStateConst);
  const [errorState, setErrorState] = useState(errorStateConst);

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
    setAlertState(alertStateConst);
    setFormData(docFormDataConst);
    setErrorState(errorStateConst);
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
