import { useRoutes } from "react-router-dom";
import "./App.css";
import routes from "./router/Router";
import React from "react";
import UserContextProvider from "./context/UserContext";
import { Provider } from "react-redux";
import { store } from "./redux/app/store";
function App() {
  const Router = useRoutes(routes);
  return (
    <Provider store={store}>
      <UserContextProvider>{Router}</UserContextProvider>;
    </Provider>
  );
}

export default App;
