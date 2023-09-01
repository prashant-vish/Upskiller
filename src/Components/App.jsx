import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import Appbar from "./Appbar";
import Addcourse from "./Addcourse";
import Courses from "./Courses";
import Course from "./Course";
import { height } from "@mui/system";
import Landing from "./Landing";
import { useState, useEffect } from "react";
import axios from "axios";

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
  const [userEmail, setuserEmail] = useState(null);

  const init = async () => {
    const response = await axios.get("http://localhost:3000/admin/me", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (response.data.username) {
      setuserEmail(response.data.username);
    }
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <div style={{ backgroundColor: "#eeeeee", width: "100vw", height: "auto" }}>
      <Router>
        <Appbar userEmail={userEmail} setuserEmail={setuserEmail}></Appbar>
        <Routes>
          <Route path="/course/:courseId" element={<Course />} />
          <Route path="/addcourse" element={<Addcourse />} />
          <Route path="/courses" element={<Courses />} />
          <Route
            path="/signup"
            element={<Signup setuserEmail={setuserEmail} />}
          />
          <Route
            path="/signin"
            element={<Signin setuserEmail={setuserEmail} />}
          />
          <Route path="/" element={<Landing userEmail={userEmail} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
