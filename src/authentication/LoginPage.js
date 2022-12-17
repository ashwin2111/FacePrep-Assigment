import React from "react";
import { useNavigate } from "react-router-dom";
import Person2Icon from "@mui/icons-material/Person2";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import "./login.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("auth", true);
    navigate("/");
  };
  return (
    <div>
      <div className="main">
        <div className="sub-main">
          <div>
            <div className="imgs">
              <div className="container-image">
                <Person2Icon
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "130px",
                  }}
                />
              </div>
            </div>
            <div>
              <h1>Login Page</h1>
              <div>
                <EmailIcon
                  style={{
                    height: "25px",
                    width: "25px",
                    position: "absolute",
                    padding: "14px 0 0 25px",
                  }}
                />
                <input type="text" placeholder="user name" className="name" />
              </div>
              <div className="second-input">
                <LockIcon
                  style={{
                    height: "25px",
                    width: "25px",
                    position: "absolute",
                    padding: "14px 0 0 25px",
                  }}
                />

                <input
                  type="password"
                  placeholder="password"
                  className="name"
                />
              </div>
              <div className="login-button" onClick={handleSubmit}>
                <button>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
