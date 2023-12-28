import AuthRoute from '../authUser/authUser';

import Home from '../components/productContainer'
import Cart from '../components/cart/cartContainer'
import Myorder from '../components/myorder/myorderContainer'
import Signin from '../components/loginSignup/signin'
import Signup from '../components/loginSignup/signup'
import Signout from '../components/loginSignup/signout'
import ChangePassword from '../components/changePassword'
import ForgetPassword from '../components/forgetPassword'
import SellerSignup from "../components/loginSignup/sellerSignup"

import SellerDashboard from "../components/sellerEnd/dashboard"
import SellerAddProducts from "../components/sellerEnd/addProducts"
import SellerOrders from "../components/sellerEnd/orders"


const GuestRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "signin",
    element: <Signin />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgetPassword",
    element: <ForgetPassword />,
  },
  {
    path: "becomeSeller",
    element: <SellerSignup />,
  },
]

const UserRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "cart",
    element: <Cart />,
  },
  {
    path: "myOrder",
    element: <Myorder />,
  },
  {
    path: "signout",
    element: <Signout />,
  },
  {
    path: "changePassword",
    element: <ChangePassword />,
  },
]

const SellerRoutes = [
  {
    path: 'seller',
    element: <SellerDashboard />
  },
  {
    path: 'addProducts',
    element: <SellerAddProducts />
  },
  {
    path: 'orders',
    element: <SellerOrders />
  }
]

export { GuestRoutes, UserRoutes, SellerRoutes, AuthRoute }