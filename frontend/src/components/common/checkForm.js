export function checkForm(formData,setErrorState,setAlertState) {
    
    let validForm = true;

    if ("name" in formData && formData.name === "") {
      setErrorState((prevState) => ({
        ...prevState,
        nameValid: true,
        nameMsg: "Please enter a name",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        nameValid: false,
        nameMsg: "",
      }));
    }

    if ("nric" in formData && !nricCheck(formData.nric)) {
      setErrorState((prevState) => ({
        ...prevState,
        nricValid: true,
        nricMsg: "Please enter a valid nric",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        nricValid: false,
        nricMsg: "",
      }));
    }

    if ("email" in formData && !emailCheck(formData.email)) {
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

    if ("password" in formData && !passwordCheck(formData.password)) {
      setErrorState((prevState) => ({
        ...prevState,
        passwordValid: true,
        passwordMsg:
          "Please enter a valid password (1 lowercase char, 1 uppercase char, 1 number, at least 8 chars)",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        passwordValid: false,
        passwordMsg: "",
      }));
    }

    if ("passwordLogin" in formData && formData.passwordLogin === "") {
        setErrorState((prevState) => ({
          ...prevState,
          passwordValid: true,
          passwordMsg:
          "Password field is empty",
        }));
        validForm = false;
      } else {
        setErrorState((prevState) => ({
          ...prevState,
          passwordValid: false,
          passwordMsg: "",
        }));
      }

    if ("password2" in formData && (formData.password !== formData.password2)) {
      setErrorState((prevState) => ({
        ...prevState,
        password2Valid: true,
        password2Msg: "Passwords do not match. Please check and type again",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        password2Valid: false,
        password2Msg: "",
      }));
    }

    if ("contactNum" in formData && !contactCheck(formData.contactNum)) {
      setErrorState((prevState) => ({
        ...prevState,
        contactValid: true,
        contactMsg: "Please enter a valid contact number",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        contactValid: false,
        contactMsg: "",
      }));
    }

    if ("dateOfBirth" in formData && !dateCheck(formData.dateOfBirth)) {
      setErrorState((prevState) => ({
        ...prevState,
        dobValid: true,
        dobMsg: "Please enter a valid date of birth (at least 12 years of age",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        dobValid: false,
        dobMsg: "",
      }));
    }

    if ("isStaff" in formData && formData.staffType === "") {
      setErrorState((prevState) => ({
        ...prevState,
        staffValid: true,
        staffMsg: "Please select staff type",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        staffValid: false,
        staffMsg: "",
      }));
    }

    if ("isStaff" in formData && formData.qualificationType === "") {
      setErrorState((prevState) => ({
        ...prevState,
        qualValid: true,
        qualMsg: "Please select qualification type",
      }));
      validForm = false;
    } else {
      setErrorState((prevState) => ({
        ...prevState,
        qualValid: false,
        qualMsg: "",
      }));
    }

    if ("shotType" in formData && formData.shotType === "") {
        setErrorState((prevState) => ({
          ...prevState,
          shotValid: true,
          shotMsg: "Please select a shot type",
        }));
        validForm = false;
      } else {
        setErrorState((prevState) => ({
          ...prevState,
          shotValid: false,
          shotMsg: "",
        }));
      }

      if ("streetAddress" in formData && formData.streetAddress === "") {
        setErrorState((prevState) => ({
          ...prevState,
          addressValid: true,
          addressMsg: "Please enter an address",
        }));
        validForm = false;
      } else {
        setErrorState((prevState) => ({
          ...prevState,
          addressValid: false,
          addressMsg: "",
        }));
      }
  
      if ("postalCode" in formData && !postalCheck(formData.postalCode)) {
        setErrorState((prevState) => ({
          ...prevState,
          postalValid: true,
          postalMsg: "Please enter a valid postal code",
        }));
        validForm = false;
      } else {
        setErrorState((prevState) => ({
          ...prevState,
          postalValid: false,
          postalMsg: "",
        }));
      }

    if (!validForm) {
      setAlertState({
        type: "error",
        status: true,
        message: "Error in form, please check!",
      });
    } else {
      setAlertState({
        type: "",
        status: false,
        message: "",
      });

    setTimeout(() => {
        setAlertState({
          type: "success",
          status: false,
          message: "",
        });
      }, 1250);
    }
   
    return validForm;
  }

  function nricCheck(nric) {
    let validFirstChar = ["S", "T", "F", "G"];
    let nricWeight = [2, 7, 6, 5, 4, 3, 2];
    let nricCheckSum = 0;
    let stCheckChar = ["J", "Z", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
    let fgCheckChar = ["X", "W", "U", "T", "R", "Q", "P", "N", "M", "L", "K"];

    if (nric.length !== 9) {
      return false;
    }

    let firstChar = nric[0];
    let lastChar = nric[8];

    if (validFirstChar.indexOf(firstChar) === -1) {
      return false;
    }

    for (let i = 0; i < 7; i++) {
      nricCheckSum += parseInt(nric[i + 1]) * nricWeight[i];
    }

    if (firstChar === "T" || firstChar === "G") {
      nricCheckSum += 4;
    }

    nricCheckSum %= 11;

    if (
      validFirstChar.indexOf(firstChar) < 2 &&
      stCheckChar[nricCheckSum] === lastChar
    ) {
      return true;
    } else if (
      validFirstChar.indexOf(firstChar) > 1 &&
      fgCheckChar[nricCheckSum] === lastChar
    ) {
      return true;
    } else {
      return false;
    }
  }

  function emailCheck(email) {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }

  function passwordCheck(password) {
    const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return regexp.test(password);
  }

  function contactCheck(contact) {
    const regexp = /^(?=.*[0-9])(?=.{8,})/;
    return regexp.test(contact);
  }

  function dateCheck(date) {

    if (date === "") {
        return false
    }

    let dateTimeNow = Date.now();
    let ageGap = 86400000 * 365 * 12;

    if (Date.parse(date) > dateTimeNow - ageGap) {
      return false;
    } else {
      return true;
    }

    
  }

  function postalCheck(postal) {
    const regexp = /^(?=.*[0-9])(?=.{6,})/;
    return regexp.test(postal);
  }