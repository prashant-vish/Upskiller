import { Typography, Button } from "@mui/material";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Landing({ userEmail }) {
  const navigate = useNavigate();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={12} md={12} lg={5}>
          <div style={{ margin: "5vw" }}>
            <Typography variant="h3">Coursera Admin DashBoard</Typography>
            <Typography variant="h5">A place to Learn New Skills</Typography>
            {!userEmail && (
              <div style={{ display: "flex", margin: 20 }}>
                <div>
                  <Button
                    size="Larger"
                    variant="contained"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Signup
                  </Button>
                </div>
                <div style={{ marginLeft: 10 }}>
                  <Button
                    size="Larger"
                    variant="contained"
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    Signin
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Grid>
        <Grid item sm={12} md={10} lg={7}>
          <div
            style={{
              margin: 50,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={"../src/assets/bg1.jpg"}
              width={"100%"}
              style={{ borderRadius: 20 }}
            />
          </div>
        </Grid>
      </Grid>
      <div></div>
    </>
  );
}

export default Landing;
