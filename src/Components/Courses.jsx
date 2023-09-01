import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function getCourse() {
      const response = await axios.get("http://localhost:3000/admin/courses", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setCourses(response.data.courses);
    }
    getCourse();
  }, []);

  if (!courses.length) {
    return <>Loading...</>;
  }
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 40,
      }}
    >
      {courses.map((course) => {
        return <Course course={course} />;
      })}
    </div>
  );
}

export function Course({ course }) {
  const navigate = useNavigate();
  return (
    <Card
      varint="outlined"
      style={{
        margin: 30,
        width: 400,
        minHeight: 150,
      }}
    >
      <Typography variant="h6" textAlign={"center"}>
        {course.title}
      </Typography>
      <Typography variant="subtitle1" textAlign={"center"}>
        {course.description}
      </Typography>

      <img src={course.imageLink} style={{ width: 400 }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: 5,
        }}
      >
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            navigate("/course/" + course._id);
          }}
        >
          EDIT
        </Button>
        <Button size="small" variant="contained" onClick={() => {}}>
          DELETE
        </Button>
      </div>
    </Card>
  );
}

export default Courses;
