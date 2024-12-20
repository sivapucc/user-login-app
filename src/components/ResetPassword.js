import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
export function ResetPassword() {
  const [pass, setPass] = useState(true);
  const [conpass, setConpass] = useState(true);
  const [newpass, setNewpass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const eyeHandlerOne = () => {
    setPass(!pass);
  };
  const eyeHandlerTwo = () => {
    setConpass(!conpass);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const updatedPassword = {
      pass,
    };
    if (newpass !== "" && confirm !== "" && newpass === confirm) {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://user-login-be-pi.vercel.app/update/password",
        {
          method: "POST",
          body: JSON.stringify(updatedPassword),
          headers: {
            "Content-type": "application/json",
            token: token,
          },
        }
      );

      const data = await response.json();
      if (data.isUpdate === true) {
        navigate("/login");
      }
    } else {
      setError(true);
    }
  }
  return (
    <div className={`Loginpage-Container `}>
      <h3 style={{ padding: "20px" }} className="text-white">
        Reset Password
      </h3>

      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <span className="emailLable">
            <Form.Label className="font-weight-bold text-white">
              Password
            </Form.Label>
          </span>

          <Form.Control
            type={pass ? "password" : "text"}
            placeholder="Enter New password"
            className="w-100"
            onChange={(e) => setNewpass(e.target.value)}
          />
          <FontAwesomeIcon
            icon={pass ? faEyeSlash : faEye}
            className="eye"
            onClick={() => eyeHandlerOne()}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <span className="password-container">
            <Form.Label className="font-weight-bold text-white">
              confirm Password
            </Form.Label>
          </span>
          <Form.Control
            type={conpass ? "password" : "text"}
            placeholder="Re-enter Password"
            style={{ width: "25rem" }}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <FontAwesomeIcon
            icon={conpass ? faEyeSlash : faEye}
            className="eye"
            onClick={() => eyeHandlerTwo()}
          />
        </Form.Group>
        {error ? (
          <Alert variant="danger" onClick={() => setError(!error)} dismissible>
            Please enter valid password!
          </Alert>
        ) : (
          ""
        )}
        <Button
          type="submit"
          style={{ width: "25rem" }}
          onClick={(e) => handleSubmit(e)}
        >
          Update
        </Button>
      </Form>
    </div>
  );
}
