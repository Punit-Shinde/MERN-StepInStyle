import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WebFont from "webfontloader";

import "./App.css";

import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home"

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route extact path="/" Component={Home} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
