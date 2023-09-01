import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Appbar({ userEmail, setuserEmail }) {
  const navigate = useNavigate();

  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <div>
          <Typography
            variant="h6"
            style={{ backgroundColor: "pink", borderRadius: "30%" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Coursera
          </Typography>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                navigate("/addcourse");
              }}
            >
              ADD COURSE
            </Button>
          </div>
          <div style={{ marginRight: 10 }}>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                navigate("/courses");
              }}
            >
              ALL COURSES
            </Button>
          </div>
          <div style={{ marginRight: 10 }}>{userEmail}</div>
          <div style={{ marginRight: 20 }}>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                localStorage.setItem("token", null);
                // window.location = "/signup";
                navigate("/");
                setuserEmail(null);
              }}
            >
              LOG OUT
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 10,
      }}
    >
      <div>
        <Typography
          variant="h6"
          style={{ backgroundColor: "pink", borderRadius: "30%" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Corusera
        </Typography>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 10 }}>
          <Button
            variant="contained"
            onClick={() => {
              // window.location = "/signup";
              navigate("/signup");
            }}
          >
            Sign Up
          </Button>
        </div>
        <div style={{ marginRight: 20 }}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Appbar;
