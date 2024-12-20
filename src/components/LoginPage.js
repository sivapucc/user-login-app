import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Alert from "react-bootstrap/Alert";

export function Loginpage() {
  const [enable, setEnable] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [blur, setBlur] = useState("");
  const [foemail, setFoemail] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setEnable(true);
    setBlur("blur");
  };
  const [pass, setPass] = useState(true);
  const eyeHandlerOne = () => {
    setPass(!pass);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(email, password);

    if (email !== "" && password !== "" && password.length > 4) {
      const userData = {
        email,
        password,
      };
      const response = await fetch(
        "https://user-login-be-pi.vercel.app/login",
        {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      let data = await response.json();
      console.log(data);
      navigate(`/dashboard`, {
        state: data,
      });
    } else {
      setError(true);
    }
  }

  //forgot password
  async function handleReset() {
    const useremail = {
      foemail,
    };

    const response = await fetch("https://user-login-be-pi.vercel.app/forgot", {
      method: "POST",
      body: JSON.stringify(useremail),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/authendicate");
    }
  }

  return (
    <>
      <div className={`Loginpage-Container ${blur} `}>
        <span className="logincir"></span>
        <h3 style={{ padding: "20px" }} className="text-white">
          Sign in to your account
        </h3>

        <Form>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <span className="emailLable">
              <Form.Label className="font-weight-bold text-white">
                Email address
              </Form.Label>
            </span>

            <Form.Control
              type="email"
              placeholder="Enter email"
              className="w-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <span className="password-container">
              <Form.Label className="font-weight-bold text-white">
                Password
              </Form.Label>
              <Form.Label className="text-primary font-weight-bold">
                <Link onClick={handleClick}> Forgot Password?</Link>
              </Form.Label>
            </span>
            <Form.Control
              type={pass ? "password" : "text"}
              placeholder="Password"
              style={{ width: "25rem" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={pass ? faEyeSlash : faEye}
              className="eye"
              onClick={() => eyeHandlerOne()}
            />
          </Form.Group>

          {error ? (
            <Alert
              variant="danger"
              onClick={() => setError(!error)}
              dismissible
            >
              Please fill all the fields!
            </Alert>
          ) : (
            ""
          )}
          <Button
            type="submit"
            style={{ width: "25rem" }}
            onClick={(e) => handleSubmit(e)}
          >
            Sign in
          </Button>
        </Form>

        <Link to={"/signuppage"} className="mt-3">
          <span className="text-primary">Create an account</span>
        </Link>
      </div>

      {enable && (
        <Card
          border="info"
          style={{ width: "28rem" }}
          className="forgotContainer"
        >
          <Card.Body>
            <h3>Forgot Password</h3>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <span className="emailLable">
                <Form.Label className="font-weight-bold text-white">
                  Email address
                </Form.Label>
              </span>

              <Form.Control
                type="email"
                value={foemail}
                placeholder="Enter email"
                style={{ width: "26rem" }}
                onChange={(e) => setFoemail(e.target.value)}
              />
            </Form.Group>
            <Button
              type="submit"
              style={{ width: "100%" }}
              onClick={() => handleReset()}
            >
              Get Otp
            </Button>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
