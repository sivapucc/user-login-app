import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);

  async function handleClick() {
    if (otp !== "") {
      const otpstring = {
        otp,
      };
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:9080/verifyotp", {
        method: "POST",
        body: JSON.stringify(otpstring),
        headers: {
          "Content-type": "application/json",
          token: token,
        },
      });
      const data = await response.json();

      if (data.msg === "valid") {
        navigate("/resetpassword");
      } else {
        console.log("invalid otp");
      }
    } else {
      setError(true);
    }
  }
  return (
    <div className="otp-Container">
      <h1>Otp Verification</h1>
      <Card
        className="text-center bg-light text-success card-container"
        style={{ width: "28rem", height: "18rem" }}
      >
        <Card.Body className="card-body">
          <Card.Title>Enter Otp code</Card.Title>
          <Card.Text>
            <input
              type="text"
              value={otp}
              className="otpinput"
              maxLength={4}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Card.Text>
          {error ? (
            <Alert
              variant="danger"
              onClick={() => setError(!error)}
              dismissible
            >
              Please enter your otp
            </Alert>
          ) : (
            ""
          )}
          <Button variant="primary" onClick={() => handleClick()}>
            Verify otp
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Otp;
