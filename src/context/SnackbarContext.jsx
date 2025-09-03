import { createContext, useState, useContext } from "react";
import SnackBar from "../components/SnackBar";

const SnackBarContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSnackBar = () => useContext(SnackBarContext);

export const SnackBarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showSnackBar = (msg) => {
    console.log(msg);
    setMessage(msg);
    setOpen(true);
  };

  return (
    <SnackBarContext.Provider value={{ showSnackBar }}>
      {children}
      <SnackBar open={open} setOpen={setOpen} message={message} />
    </SnackBarContext.Provider>
  );
};
