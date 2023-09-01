import { Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin({ setuserEmail }) {
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
      const response = await axios.post(
        "http://localhost:3000/admin/login",
        {},
        {
          headers: {
            username: email,
            password: password,
          },
        }
      );
      console.log("axios error");
      let data = response.data;
      if (data.token == "0") {
        alert("Invalid Email or Password!");
      } else {
        localStorage.setItem("token", data.token);
        setuserEmail(email);
        navigate("/");
        // window.location = "/";
      }
    } else {
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography style={{ paddingTop: 80, fontSize: "1rem" }}>
          Welcome back!! Signin below
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
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
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
            SIGN IN
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
