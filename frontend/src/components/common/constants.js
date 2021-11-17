import { styled } from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";

export const StyledModal = styled(ModalUnstyled)`
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

export const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

export const style = {
  width: 600,
  bgcolor: "white",
  border: "2px solid #000",
  p: 2,
  px: 4,
  pb: 3,
};

export const formDataConst = {
  name: "",
  email: "",
  nric: "",
  password: "",
  password2: "",
  dateOfBirth: "",
  contactNum: "",
}

export const docFormDataConst = {
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
}

export const errorStateConst = {
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
}

export const alertStateConst = {
  type: "error",
  status: false,
  message: "",
}

export const centerFormDataConst = {
  name: "",
  shotType: "",
  streetAddress: "",
  postalCode: "",
  contactNum: "",
}

export const centerErrorStateConst = {
  nameValid: false,
  nameMsg: "",
  shotValid: false,
  shotMsg: "",
  addressValid: false,
  addressMsg: "",
  postalValid: false,
  postalMsg: "",
  contactValid: false,
  contactMsg: "",
}

export const roomFormDataConst = { name: "" }

export const loginFormDataConst = { email: "", passwordLogin: "" }

export const loginErrorStateConst = {
  emailValid: false,
  emailMsg: "",
  passwordLoginValid: false,
  passwordLoginMsg: "",
}

export const roomErrorStateConst = {
  nameValid: false,
  nameMsg: "",
}