import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import "./App.css";
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Contact from "./components/layout/Contact/Contact.js";
import About from "./components/layout/About/About.js";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Products/ProductDetails.js";
import Products from "./components/Products/Products.js";
import LoginSignUp from "./components/User/LoginSignUp.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import Profile from "./components/User/Profile.js";
import store from "./store/store.js";
import { loadUser } from "./actions/user.Action.js";
import UserOptions from "./components/layout/Header/UserOptions.js";
import ProtectedRoute from "./components/Routes/ProtectedRoute.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./components/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import ScrollToTop from "./components/layout/ScrollToTop.js";
import NotFound from "./components/layout/Not Found/NotFound.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);
  return (
    <div className="App">
      <Router>
        <ScrollToTop/>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <ProtectedRoute exact path="/account" element={<Profile />} />
        <ProtectedRoute exact path="/me/update" element={<UpdateProfile />} />
        <ProtectedRoute exact path="/shipping" element={<Shipping />} />
        <ProtectedRoute exact path="/success" element={<OrderSuccess />} />
        <ProtectedRoute
          exact
          path="/order/confirm"
          element={<ConfirmOrder />}
        />
{stripeApiKey && <ProtectedRoute exact path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>}/>}
        {/* <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" element={<Payment />} />
        </Elements> */}

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/about" element={<About />} />
          <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
