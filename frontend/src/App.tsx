import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/sign-in/SignIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="\" element={<SignIn></SignIn>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
