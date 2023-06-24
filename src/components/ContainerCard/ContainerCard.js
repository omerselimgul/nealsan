import React from "react";
import "./ContainerCard.css";

const ContainerCard = (props) => {
  return <div className="Container">{props.children}</div>;
};
export default ContainerCard;
