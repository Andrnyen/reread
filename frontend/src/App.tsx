import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/sign-in/SignIn";
import Dashboard from "./pages/Dashboard";
import React from "react";
import { User } from "firebase/auth";
import SignUp from "./pages/sign-up/SignUp";
import MangaDesc from "./pages/MangaDesc";
import Read from "./pages/Read";

function App() {
  const [user, setUser] = React.useState<User | null>(null);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn setUser={setUser}></SignIn>}></Route>
        <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
        <Route
          path="/dashboard"
          element={
            user ? <Dashboard></Dashboard> : <SignIn setUser={setUser}></SignIn>
          }
        ></Route>
        <Route
          path="/manga/:mangaId"
          element={
            user ? <MangaDesc></MangaDesc> : <SignIn setUser={setUser}></SignIn>
          }
        ></Route>
        <Route
          path="/volume/:volumeId/chapter/:chapterId"
          element={user ? <Read></Read> : <SignIn setUser={setUser}></SignIn>}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
