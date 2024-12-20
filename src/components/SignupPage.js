import { useState } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

export function Signuppage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pass, setPass] = useState(true);
  const [conpass, setConpass] = useState(true);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    let userData = {
      name,
      email,
      password,
    };

    if (name !== "" && email !== "" && password !== "") {
      const response = await fetch("http://localhost:9080/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      if (data.message) {
        setMessage(data.msg);
        alert(message);
        navigate("/loginpage");
      } else {
        setError(data.msg);
      }
    } else {
      setError("please fill all the fields");
    }
  }
  const eyeHandlerOne = () => {
    setPass(!pass);
  };
  const eyeHandlerTwo = () => {
    setConpass(!conpass);
  };
  return (
    <div className="signuppage-Container">
      <span className="logincir"></span>
      <h3 style={{ padding: "20px" }} className="text-white">
        Sign in to your account
      </h3>

      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <span className="emailLable">
            <Form.Label className="font-weight-bold text-white">
              Name
            </Form.Label>
          </span>

          <Form.Control
            type="text"
            placeholder="Enter name"
            className="w-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <span className="password-container">
            <Form.Label className="font-weight-bold text-white">
              comfirm Password
            </Form.Label>
          </span>
          <Form.Control
            type={conpass ? "password" : "text"}
            placeholder="Password"
            style={{ width: "25rem" }}
          />
          <FontAwesomeIcon
            icon={conpass ? faEyeSlash : faEye}
            className="eye"
            onClick={() => eyeHandlerTwo()}
          />
        </Form.Group>
        {error ? (
          <Alert variant="danger" onClick={() => setError("")} dismissible>
            {error}
          </Alert>
        ) : (
          ""
        )}
        <Button
          type="submit"
          style={{ width: "25rem" }}
          // onClick={() => navigate("/loginpage")}
          onClick={(e) => handleSubmit(e)}
        >
          Register
        </Button>
      </Form>

      <span className="text-primary p-3">
        Alredy have an account?{" "}
        <Link to={"/loginpage"} className="text-white">
          Login
        </Link>
      </span>
    </div>
  );
}
