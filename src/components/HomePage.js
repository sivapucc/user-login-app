import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
export function Home() {
  const navigate = useNavigate();
  return (
    <div className="Homecontainer">
      <div className="circle"></div>
      <h1 className="titleText">
        Welcome to Our User Authentication & Authorization
      </h1>
      <div className="subContainer">
        <Button variant="outline-info" onClick={() => navigate("/loginpage")}>
          Login
        </Button>
        <Button variant="outline-info" onClick={() => navigate("/signuppage")}>
          Signup
        </Button>
      </div>
    </div>
  );
}
