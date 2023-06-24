import React from "react";

const IncreaseDecreaseButton = ({
  Amount,
  increaseHandler,
  decreaseHandler,
  ...props
}) => {
  return (
    <div
      style={{
        width: "8rem",
        height: "40px",
        backgroundColor: "#C3ECEA",
        borderRadius: "30px ",
        padding: "5px 0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <img
        src="images/Decrease.svg"
        alt=""
        height="45px"
        onClick={() => decreaseHandler(Amount)}
      />
      <span style={{ color: "#349590" }}>{Amount}</span>
      <img
        src="images/add.svg"
        alt=""
        height="45px"
        onClick={() => increaseHandler(Amount)}
      />
    </div>
  );
};
IncreaseDecreaseButton.defaultProps = {
  increaseHandler: (amount) => {
    amount++;
  },
  decreaseHandler: (amount) => {
    amount--;
  },
};
export default IncreaseDecreaseButton;
