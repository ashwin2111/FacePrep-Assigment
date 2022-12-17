import { React, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import InfinitePageScroll from "./InfinitePageScroll";
import { Tooltip } from "@mui/material";
import "../authentication/login.css";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e?.target?.value?.toLowerCase();
    setInputText(lowerCase);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <div className="wrapper">
        <div className="search">
          <div>
            <SearchIcon
              style={{
                height: "25px",
                width: "25px",
                position: "absolute",
                padding: "14px 0 0 25px",
              }}
            />
            <input
              type="text"
              placeholder="Search..."
              className="name"
              onChange={inputHandler}
            />
          </div>
          <div className="logoutIcon">
            <Tooltip title="LogOut">
              <Button
                style={{
                  width: "10%",
                  backgroundColor: " rgb(223, 221, 221)",
                  borderRadius: "60px",
                }}
                onClick={handleLogout}
              >
                <LogoutIcon />
              </Button>
            </Tooltip>
          </div>
        </div>
        <InfinitePageScroll input={inputText} />
      </div>
    </>
  );
}
