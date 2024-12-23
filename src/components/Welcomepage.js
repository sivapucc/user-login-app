import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export function WelcomePage() {
  const navigate = useNavigate();
  return (
    <div className="welcomecontainer">
      <h1 className="h-one">Welcome to our URL SHORTner</h1>

      <Button variant="primary" size="lg" onClick={() => navigate("/home")}>
        Get started
      </Button>
    </div>
  );
}
