import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Loginpage } from "./components/LoginPage";
import { Signuppage } from "./components/SignupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ResetPassword } from "./components/ResetPassword";
import Otp from "./components/Otp";
import { Home } from "./components/HomePage";
import { Dashboard } from "./components/Dashboard";
import { WelcomePage } from "./components/Welcomepage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/loginpage" element={<Loginpage />} />
          <Route path="/signuppage" element={<Signuppage />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/authendicate" element={<Otp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
