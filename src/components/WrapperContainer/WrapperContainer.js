import React, { useEffect, useState } from "react";
import "./WrapperContainer.css";
import { Grid } from "@mui/material";

const WrapperContainer = (props) => {
  const [data, setData] = useState([]);
  const [style, setStyle] = useState({ width: "100%", overflow: "auto" });
  useEffect(() => {
    if (props?.children) {
      if (
        typeof props?.children === "object" &&
        !Array.isArray(props?.children) &&
        props?.children !== null
      ) {
        setData([props?.children]);
      } else {
        setData(props?.children);
      }
    }
  }, [props.children]);
  useEffect(() => {
    let customStyle = {};
    if (props?.ContentCenter) {
      customStyle = { ...customStyle, justifyContent: "center" };
    }
    if (props?.AlignItemsCenter) {
      customStyle = { ...customStyle, alignItems: "center" };
    }
    if (props?.Height) {
      customStyle = { ...customStyle, height: props.Height };
    }
    setStyle(customStyle);
  }, [props?.AlignItemsCenter, props?.ContentCenter, props.Height]);

  return (
    <Grid
      style={style}
      {...props}
      rowGap={props?.rowGap || 2}
      container
      // spacing={props?.spacing || 2}
      // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      columns={props?.columns || 13}
      margin="1rem 0rem"
      columnGap={1}
    >
      {data.length > 0 &&
        data.map((child) => {
          let size = child?.props?.xs || 2;
          return (
            <Grid item xs={size} style={{ padding: "0px" }}>
              {child}
            </Grid>
          );
        })}
    </Grid>
  );
};
export default WrapperContainer;
