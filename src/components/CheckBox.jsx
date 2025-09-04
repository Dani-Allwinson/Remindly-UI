import { Checkbox } from "@mui/material";
import { useState } from "react";

const CheckBox = ({ value = false, setValue, name }) => {
  const [isChecked, setChecked] = useState(value);
  return (
    <Checkbox
      sx={{
        color: "#61758A",
        borderWidth: 0.3,
      }}
      value={!isChecked}
      checked={isChecked}
      onChange={(e) => {
        console.log(e);
        setChecked((prev) => !prev);
        setValue(e.target.value);
      }}
      name={name}
      color="primary"
    />
  );
};

export default CheckBox;
