import HomepageWithoutAuth from "../pages/homepage-without-auth/HomepageWtihoutAuth";
import Login from "../pages/login/Login";
import { HomeLayout, PrivateLayout } from "../layouts";
import HomePage from "../pages/homepage/HomePage";
import { CartPage } from "../pages/Cart";
import { WalletPage } from "../pages/walletpage";
const routes = [
  {
    path: "/",
    element: <HomepageWithoutAuth />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    auth: true,
    path: "/home",
    element: <HomePage />,
  },
  {
    auth: true,
    path: "/cart",
    element: <CartPage />,
  },
  {
    auth: true,
    path: "/mywallet",
    element: <WalletPage />,
  },
];
const authMap = (routes, isChild) =>
  routes.map((route) => {
    if (route?.auth) {
      if (isChild !== true) {
        route.element = (
          <PrivateLayout>
            <HomeLayout isAuth={true}>{route.element}</HomeLayout>
          </PrivateLayout>
        );
      }
    } else {
      if (isChild !== true) {
        route.element = <HomeLayout>{route.element}</HomeLayout>;
      }
    }
    if (route?.children) {
      route.children = authMap(route.children, true);
    }
    return route;
  });

export default authMap(routes);
