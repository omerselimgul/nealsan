import React, { useEffect, useState } from "react";
import "./HomepageWithoutAuth.css";
import { useAuth } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import HomePage from "../homepage/HomePage";

const HomepageWithoutAuth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [navigate, user]);

  return <HomePage isNotAuth={true} />;
};

export default HomepageWithoutAuth;
