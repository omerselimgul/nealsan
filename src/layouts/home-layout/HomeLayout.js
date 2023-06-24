import React, { useCallback, useEffect } from "react";
import "./HomeLayout.css";
import { WrapperContainer } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { setWallet } from "../../redux/features/wallet/walletSlice";
import { auth, db } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../../context/UserContext";

const HomeLayout = (props, isAuth) => {
  const wallet = useSelector((state) => state.wallet);
  const productsCollcetionRef = collection(db, "Products");
  const countOfProducts = useSelector((state) => state.countOfProducts);
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    walletHandler();
  }, [countOfProducts]);

  const walletHandler = async () => {
    const coll = await getDocs(productsCollcetionRef);

    const data = coll.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    if (countOfProducts && data?.length > 0) {
      let calculatedWallet = 30000;
      data.map((pro) => {
        if (countOfProducts[pro.id]) {
          let priceOfProduct = parseInt(pro?.Price?.replace(".", ""));

          calculatedWallet -= countOfProducts[pro.id] * priceOfProduct;
        }
      });
      dispatch(setWallet(calculatedWallet));
    }
  };

  const navbarSet = useCallback(() => {
    if (props?.isAuth) {
      return (
        <WrapperContainer xs={7} columns={7} ContentCenter>
          <div xs={2} className="navbar-right">
            <img alt="" src={"images/usericon.png"}></img>
            <a href="/" onClick={() => logoutClick()}>
              Ahmet Yılmaz
            </a>
          </div>
          <div xs={2.4}>
            <a href="/mywallet" className="navbar-right">
              <img alt="" src={"images/cuzdan.svg"}></img>
              <p>Cüzdanım </p>
              <span
                style={{
                  backgroundColor: "#C3ECEA",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                {wallet} TL
              </span>
            </a>
          </div>
          <div xs={2} className="navbar-right">
            <a href="/cart" className="navbar-right">
              <img alt="" src={"images/sepetim.svg"}></img>
              Sepetim
            </a>
          </div>
        </WrapperContainer>
      );
    } else {
      return (
        <div xs={2} className="navbar-right">
          <img width="30%" alt="" src={"images/usericon.png"}></img>
          <a className="loginButton" href="/login">
            Giriş Yap
          </a>
        </div>
      );
    }
  }, [props?.isAuth, wallet]);
  const logoutClick = async () => {
    localStorage.clear();
    await signOut(auth);
    window.location = "/";
  };
  return (
    <div>
      {/* {navbar()} */}
      <WrapperContainer
        spacing={1}
        sx={{
          padding: "0px 4%",
        }}
        AlignItemsCenter
      >
        <div xs={props?.isAuth ? 5 : 10} className="navbar-left">
          <a href={user ? "/home" : "/"} alt="">
            <img src={"images/nealsam.jpg"} alt="" width="200px"></img>
          </a>
        </div>
        {navbarSet()}
      </WrapperContainer>
      <>{props.children}</>
    </div>
  );
};

export default HomeLayout;
