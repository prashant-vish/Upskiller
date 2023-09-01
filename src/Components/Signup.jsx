import {
  Hidden,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";
import { Grid } from "@mui/material";
import { json, useNavigate } from "react-router-dom";

function Signup({ setuserEmail }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();
  const handleChange = (event, role) => {
    setRole(role);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Seems you have not filled Email/ Password");
      return;
    }
    if (role === "admin") {
      const response = await axios.post("http://localhost:3000/admin/signup", {
        username: email,
        password: password,
      });
      let data = response.data;
      if (data.token) {
        localStorage.setItem("token", data.token);
        // window.location = "/";
        alert("Congrats You are Signed Up!");
        setuserEmail(email);
        navigate("/");
      } else {
        alert("Admin Already Exists");
      }
    } else {
      const response = await axios.post("http://localhost:3000/user/signup", {
        username: email,
        password: password,
      });
      let data = response.data;
      if (data.token) {
        localStorage.setItem("token", data.token);
        // window.location = "/";
        alert("Congrats You are Signed Up!");
        setuserEmail(email);
        navigate("/");
      } else {
        alert("Admin Already Exists");
      }
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          // gridTemplateColumns: repeat(2, "1fr"),
          justifyContent: "space-around",
          alignItems: "center",

          margin: "2rem",
          backgroundColor: "#eeeeee",
          height: "100vh",
        }}
      >
        <div>
          <div style={{ width: "40vw" }}>
            <img width="100%" src="../src/assets/signup.jpg" alt="" />
          </div>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography style={{ paddingTop: 80, fontSize: "1rem" }}>
              Welcome to the Coursera SignUp below
            </Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card varint="outlined" style={{ width: 400, padding: 20 }}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <br />
              <br />

              <TextField
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                label="Password"
                variant="outlined"
                fullWidth={true}
                type={"password"}
              />
              <br />
              <br />
              <ToggleButtonGroup
                color="primary"
                value={role}
                exclusive
                onChange={handleChange}
                aria-label="admin or user"
                size="small"
                style={{ margin: "20px auto" }}
                fullWidth
              >
                <ToggleButton value="user">USER</ToggleButton>
                <ToggleButton value="admin">ADMIN</ToggleButton>
              </ToggleButtonGroup>
              <Button size="larger" variant="contained" onClick={handleLogin}>
                SIGN UP
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
