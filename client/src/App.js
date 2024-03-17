import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import "./App.css";
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginSignUp from "./components/User/LoginSignUp.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import Profile from "./components/User/Profile.js";
import store from "./store/store.js";
import { loadUser } from "./actions/user.Action.js";
import UserOptions from "./components/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);
  return (
    <div className="App">
      <Router>
        <Header />

        {isAuthenticated && <UserOptions user={user} />}
          <ProtectedRoute exact path="/account" element={<Profile />} />
          <ProtectedRoute exact path="/me/update" element={<UpdateProfile />} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<LoginSignUp />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
