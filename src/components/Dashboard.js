import Button from "react-bootstrap/Button";
import { useLocation, useNavigate } from "react-router-dom";
export function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const receivedData = location.state;

  return (
    <div className="Homecontainer">
      <h1 className="titleText">Welcome to Our Website</h1>
      <div className="subContainer">
        <h3>{receivedData.useName}</h3>
        <Button variant="outline-info" onClick={() => navigate("/")}>
          Logout
        </Button>
      </div>
    </div>
  );
}
