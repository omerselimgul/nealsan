import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/UserContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  var nav = useNavigate();
  console.log(user);
  if (!user) {
    nav("/login");
    // return <Navigate to={"/login"} />;
  }

  return children;
};

export default PrivateRoute;
