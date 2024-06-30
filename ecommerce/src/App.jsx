import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import ProductList from './features/product/Component/productlist.jsx'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Cart from './features/cart/cart.jsx'
import CartPage from './pages/CartPage.jsx'
import Checkout from './pages/Checkout.jsx'
import ProductDetail from './features/product/Component/ProductDetail.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import Protected from './features/auth/component/Protected.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice.jsx'
import { selectLoggedInUser } from './features/auth/authSlice.jsx'
import PageNotFound from './pages/404.jsx'
import OrderSuccessPage from './pages/orderSuccessPage.jsx'
import UserOrders from './features/user/componenet/UserOrders.jsx'
import { fetchLoggedInUserAsync, fetchLoggedInUserOrdersAsync } from './features/user/UserSlice.jsx'
import UserOrdersPage from './pages/UserOrdersPage.jsx'
import UserProfilePage from './pages/userProfilePage.jsx'
import ForgotPasswordPage from './pages/ForgetPasswordPage.jsx'
import ProtectedAdmin from './features/auth/component/ProtectedAdmin.jsx'
import AdminHomePage from './pages/adminHomePage.jsx'
import AdminProductDetailPage from './pages/adminProductDetailPage.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home></Home></Protected>
  },
  {
    path: "/admin",
    element: <ProtectedAdmin><AdminHomePage></AdminHomePage></ProtectedAdmin>
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>
  },
  {
    path: "/cart",
    element: <Protected><CartPage></CartPage></Protected>
  },
  {
    path: "/checkout",
    element: <Protected><Checkout></Checkout></Protected>
  },
  {
    path: "/product-detail/:id",
    element: <Protected><ProductDetailPage></ProductDetailPage></Protected>
  },
  {
    path: "/admin/product-detail/:id",
    element: <ProtectedAdmin><AdminProductDetailPage></AdminProductDetailPage></ProtectedAdmin>
  },
  {
    path:'/order-success/:id',
    element:(
      <OrderSuccessPage></OrderSuccessPage>
    ),
  },
  {
    path:'/orders',
    element:(
      <UserOrdersPage></UserOrdersPage>
    ),
  },
  {
    path:'/profile',
    element:(
      <UserProfilePage></UserProfilePage>
    ),
  },
  {
    path:'/forgot-password',
    element:(
      <ForgotPasswordPage></ForgotPasswordPage>
    ),
  },
  {
    path:'*',
    element:(
      <PageNotFound></PageNotFound>
    )
  }
]);

function App() {
  // const [count, setCount] = useState(0)

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(()=>{
    if(user){
      console.log(user.id)
      dispatch(fetchItemsByUserIdAsync(user.id))
      // dispatch(fetchLoggedInUserOrdersAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  },[dispatch,user])

  return (
    <div className='App'>
      <RouterProvider router={router} />
      {/* <Cart></Cart> */}
      {/* <LoginPage></LoginPage> */}
    </div>
  );
}

export default App






