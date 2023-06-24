import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/UserContext";
import { incrementProduct } from "../../redux/features/countOfProducts/counterOfProductsSlice";
import { decrementWallet } from "../../redux/features/wallet/walletSlice";
import "./Card.css";
const BaseCard = (props) => {
  const { user } = useAuth();
  const countOfProducts = useSelector((state) => state.countOfProducts);
  const dispatch = useDispatch();
  const IconSelect = () => {
    if (props && props.Icon) {
      switch (props.Icon) {
        case "AddCart":
          return (
            <div id="AddCartContainer">
              <img id="AddCartImg" src="images/pureAddToCart.png" alt="" />

              <div id="Counter">
                {countOfProducts[props.productId] > 0
                  ? countOfProducts[props.productId]
                  : "+"}
              </div>
            </div>
          );

        default:
          return;
      }
    }
  };
  const AddToCardHandler = () => {
    if (user) {
      dispatch(incrementProduct(props.productId));
      const priceOfProduct = parseInt(props.price.replace(".", ""));
      dispatch(decrementWallet(priceOfProduct));
    } else {
      window.location = "/login";
    }
  };
  return (
    <div style={{ width: "100%", display: "inline-block", margin: "0px" }}>
      <Card>
        <CardMedia
          component="img"
          style={{ objectFit: "contain" }}
          height="280"
          src={props.Path}
          image={props.Path}
          alt="Product"
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {props.description}
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography
                style={{ color: "#84c7c4" }}
                variant="h5"
                component="div"
              >
                {props.price} TL
              </Typography>
              <Typography style={{ color: "#84c7c4" }} variant="body2">
                {countOfProducts[props?.productId]
                  ? props.stock - parseInt(countOfProducts[props?.productId])
                  : props.stock}{" "}
                Adetle Sınırlı
              </Typography>
            </div>
            <CardActions disableSpacing>
              <IconButton
                onClick={
                  props?.Icon === "AddCart"
                    ? AddToCardHandler
                    : props?.IconClick || null
                }
                sx={{ backgroundColor: "#C3ECEA", padding: "0px" }}
              >
                {IconSelect()}
              </IconButton>
            </CardActions>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

BaseCard.defaultProps = {
  image: null,
  description: "test",
  price: 124,
  stock: 0,
  Icon: null,
};
export default BaseCard;
