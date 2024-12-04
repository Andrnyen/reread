import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/sign-in/SignIn";
import Dashboard from "./pages/Dashboard";
import React from "react";
import { User } from "firebase/auth";

function App() {
  const [user, setUser] = React.useState<User | null>(null);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn setUser={setUser}></SignIn>}></Route>
        <Route
          path="/dashboard"
          element={
            user ? <Dashboard></Dashboard> : <SignIn setUser={setUser}></SignIn>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
