import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const BasicButtons = (props) => {
  const [style, setStyle] = React.useState({});
  React.useEffect(() => {
    if (props?.positionEnd) {
      setStyle({
        ...style,
        display: "flex",
        alignItems: "flex-end",
        width: "90%",
      });
    }
  }, []);
  return (
    <Stack style={style} sx={{ width: "100%" }}>
      <Button {...props}>
        {props?.children ? props?.children : props.label}
      </Button>
    </Stack>
  );
};
export default BasicButtons;
