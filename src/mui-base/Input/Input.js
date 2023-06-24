import { FormControl, TextField } from "@mui/material";
const Input = (props) => {
  return (
    <FormControl fullWidth sx={{ m: 1, margin: "0px" }}>
      <TextField {...props} />
    </FormControl>
  );
};

export default Input;
