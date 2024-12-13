import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/sign-in/SignIn";
import Dashboard from "./pages/Dashboard";
import React from "react";
import { User } from "firebase/auth";
import SignUp from "./pages/sign-up/SignUp";
import { MangaProvider } from "./services/MangaContext";
import MangaDes from "./pages/MangaDes";

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
          <Route
            path="/manga/:manga-id"
            element={
              user ? <MangaDes></MangaDes> : <SignIn setUser={setUser}></SignIn>
            }
          ></Route>
        </Routes>
      </Router>
    </MangaProvider>
  );
}

export default App;
