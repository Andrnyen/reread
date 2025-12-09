import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/sign-in/SignIn";
import Dashboard from "./pages/Dashboard";
import React from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import SignUp from "./pages/sign-up/SignUp";
import MangaDesc from "./pages/MangaDesc";
import Read from "./pages/Read";
import { auth } from "./config/firebase";

function App() {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn setUser={setUser} />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <SignIn setUser={setUser} />}
        />

        <Route
          path="/manga/:mangaId"
          element={user ? <MangaDesc /> : <SignIn setUser={setUser} />}
        />

        <Route
          path="/volume/:volumeId/chapter/:chapterId"
          element={user ? <Read /> : <SignIn setUser={setUser} />}
        />
      </Routes>
    </Router>
  );
}
export default App;
