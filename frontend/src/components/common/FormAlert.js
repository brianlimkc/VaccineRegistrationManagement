import Alert from "@mui/material/Alert";

function FormAlert({alertState}) {

    return (
            <>
            {alertState.status ? (
            <Alert id="alert" severity={alertState.type}>
              {alertState.message}
            </Alert>
          ) : (
            <></>
          )}
            </>

    )
}

export default FormAlert;


