import React, { useEffect, useRef, useState } from "react";
import { Box, ContainerCard } from "../../components";

import { Button, Input } from "../../mui-base";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [helperText, setHelperText] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user]);
  const login = async (email, password) => {
    try {
      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      if (userInfo) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      setHelperText(error?.message.split(":")[1]);
    }
  };
  const loginHandler = () => {
    const email = emailRef && emailRef.current && emailRef.current.value;
    const password =
      passwordRef && passwordRef.current && passwordRef.current.value;
    if (email && password) {
      login(email, password);
    }
  };
  return (
    <ContainerCard>
      <React.Fragment>
        <img src="images/loginImage.png" alt="" />
      </React.Fragment>
      <Box style={{ width: "30%" }}>
        <h2>En uygun fiyatlara ulaşmak için giriş yapın!</h2>
        <Input
          fullWidth
          label="E-mailiniz"
          variant="standard"
          inputRef={emailRef}
          error={helperText}
        />
        <Input
          fullWidth
          label="Şifreniz"
          variant="standard"
          inputRef={passwordRef}
          error={helperText}
          helperText={helperText}
        />
        <Button
          onClick={() => {
            loginHandler();
          }}
          variant="contained"
          label="Giriş yap"
          size="large"
          sx={{ backgroundColor: "#84C7C4" }}
        />
      </Box>
    </ContainerCard>
  );
};

export default Login;
