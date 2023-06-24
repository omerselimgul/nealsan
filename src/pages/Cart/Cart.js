import { collection, getDocs } from "firebase/firestore";
import { WrapperContainer } from "../../components";
import { HomeLayout } from "../../layouts";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { IncreaseDecreaseButton } from "../../components/IncreaseDecreaseButton";
import {
  decrementProduct,
  incrementProduct,
} from "../../redux/features/countOfProducts/counterOfProductsSlice";
import { Button } from "../../mui-base";

const CartPage = () => {
  const productsCollcetionRef = collection(db, "Products");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const countOfProducts = useSelector((state) => state.countOfProducts);

  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, [countOfProducts]);
  const getData = async () => {
    const coll = await getDocs(productsCollcetionRef);
    const data = coll.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    if (countOfProducts && data?.length > 0) {
      let selectedProducts = [];
      data.map((pro) => {
        if (countOfProducts[pro.id]) {
          selectedProducts.push({
            ...pro,
            Amount: countOfProducts[pro.id],
            Stock: pro?.Stock - parseInt(countOfProducts[pro.id]),
          });
        }
      });
      setSelectedProducts([...selectedProducts]);
    }
  };
  const increaseHandler = (Product) => {
    dispatch(incrementProduct(Product.id));
  };
  const decreaseHandler = (Product) => {
    dispatch(decrementProduct(Product.id));
  };
  // const saveClick = async() => {
  //   navigate("../home", { replace: true });
  // };
  return (
    <React.Fragment>
      <WrapperContainer
        sx={{
          backgroundColor: "#edf9f8",
          padding: "1% 4%",
          boxSizing: "border-box",
        }}
      >
        <div xs={2} className="navbar-right">
          <img alt="" src={"images/sepetim.svg"}></img>
          <span>Sepetim</span>
        </div>
      </WrapperContainer>
      {selectedProducts.length > 0 &&
        selectedProducts.map((pro) => (
          <WrapperContainer
            sx={{
              padding: "1% 4%",
              boxSizing: "border-box",
              height: "200px",
              alignItems: "center",
              color: "#349590",
            }}
            spacing={4}
          >
            <img xs={2} src={pro?.Path} height="150px" alt="" />
            <div xs={6}>
              <h2>{pro.ProductName}</h2>
              <h5>{pro.Stock} Adet Sınırlı</h5>
            </div>
            <IncreaseDecreaseButton
              xs={2}
              Amount={pro.Amount}
              increaseHandler={() => increaseHandler(pro)}
              decreaseHandler={() => decreaseHandler(pro)}
            />
            <h2>{pro?.Price} TL</h2>
          </WrapperContainer>
        ))}
      {selectedProducts.length > 0 && (
        <Button
          label="Sepeti Onayla"
          variant="contained"
          size="large"
          positionEnd={true}
          sx={{ backgroundColor: "#84C7C4", width: "30%" }}
        >
          <a href="/home" id="saveTag">
            Sepeti onayla
          </a>
        </Button>
      )}
    </React.Fragment>
  );
};

export default CartPage;
