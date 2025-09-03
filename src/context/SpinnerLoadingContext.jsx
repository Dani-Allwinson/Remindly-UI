import { Box, CircularProgress, Modal } from "@mui/material";
import { createContext, useContext, useState } from "react";

const SpinnerContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProgressSpinner = () => useContext(SpinnerContext);

const SpinnerContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const showSpinner = () => setOpen(true);
  const hideSpinner = () => setOpen(false);

  return (
    <SpinnerContext.Provider value={{ showSpinner, hideSpinner }}>
      {children}

      <Modal open={open} onClose={hideSpinner}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      </Modal>
    </SpinnerContext.Provider>
  );
};

export default SpinnerContextProvider;
