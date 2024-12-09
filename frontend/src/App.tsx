import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/sign-in/SignIn";
import Dashboard from "./pages/Dashboard";
import React from "react";
import { User } from "firebase/auth";
import SignUp from "./pages/sign-up/SignUp";
import { MangaProvider } from "./services/MangaContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// react-slick settings
export const slickSettings = {
  infinite: true,
  speed: 1000,
  slidesToShow: 5,
  slidesToScroll: 5,
  autoplay: true,
  autoplaySpeed: 4000, // Adjust this to set the speed of the auto-cycling
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function App() {
  const [user, setUser] = React.useState<User | null>(null);
  return (
    <MangaProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn setUser={setUser}></SignIn>}></Route>
          <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
          <Route
            path="/dashboard"
            element={
              user ? (
                <Dashboard></Dashboard>
              ) : (
                <SignIn setUser={setUser}></SignIn>
              )
            }
          ></Route>
        </Routes>
      </Router>
    </MangaProvider>
  );
}

export default App;
