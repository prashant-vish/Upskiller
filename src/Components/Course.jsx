import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Typography, Card, Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import axios from "axios";

function Course() {
  let { courseId } = useParams();
  const [course, setCourse] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/course/" + courseId, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourse(res.data.course);
      });
  }, []);

  if (!course) {
    return (
      <div>
        <h6>Loading.....</h6>
      </div>
    );
  }

  return (
    <>
      <GrayTopper title={course.title}></GrayTopper>
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard course={course} setCourse={setCourse} />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard course={course} />
        </Grid>
      </Grid>
    </>
  );
}

function GrayTopper({ title }) {
  return (
    <div
      style={{
        height: 250,
        background: "#212121",
        top: 0,
        width: "100vw",
        zIndex: 0,
        marginBottom: -120,
      }}
    >
      <div
        style={{
          height: 150,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: 600 }}
            variant="h3"
            textAlign={"center"}
          >
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
}

function UpdateCard({ course, setCourse }) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [price, setPrice] = useState(course.price);
  const [imageLink, setImageLink] = useState(course.imageLink);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card varint="outlined" style={{ width: 600, padding: 20 }}>
        <Typography variant="h6">Update Course Details</Typography>
        <TextField
          value={title}
          label="Title"
          variant="outlined"
          fullWidth
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          value={description}
          label="Description"
          variant="outlined"
          fullWidth
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          value={price}
          label="Price"
          variant="outlined"
          fullWidth
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <br />
        <br />
        <TextField
          value={imageLink}
          label="Image Link"
          variant="outlined"
          fullWidth
          onChange={(event) => {
            setImageLink(event.target.value);
          }}
        />
        <br />
        <br />
        <div style={{ float: "right" }}>
          <Button
            size="larger"
            variant="contained"
            onClick={async () => {
              axios
                .put(
                  "http://localhost:3000/admin/courses/" + course._id,
                  {
                    title: title,
                    description: description,
                    price: price,
                    imageLink: imageLink,
                    published: true,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                )
                .then((res) => {
                  alert("Course Updated Successfully");
                  let updatedCourse = {
                    _id: course._id,
                    title: title,
                    description: description,
                    imageLink: imageLink,
                    price: price,
                  };

                  setCourse(updatedCourse);
                });
              // fetch("http://localhost:3000/admin/courses/" + course._id, {
              //   method: "PUT",
              //   body: JSON.stringify({
              //     title: title,
              //     description: description,
              //     price: price,
              //     imageLink: imageLink,
              //     published: true,
              //   }),
              //   headers: {
              //     "Content-Type": "application/json",
              //     Authorization: "Bearer " + localStorage.getItem("token"),
              //   },
              // })
              //   .then((res) => {
              //     return res.json();
              //   })
              //   .then((data) => {
              //     alert("Course Updated Successfully");
              //     let updatedCourse = {
              //       _id: course._id,
              //       title: title,
              //       description: description,
              //       imageLink: imageLink,
              //       price: price,
              //     };

              //     setCourse(updatedCourse);
              // });
            }}
          >
            UPDATE COURSE
          </Button>
        </div>
      </Card>
    </div>
  );
}

function CourseCard(props) {
  const course = props.course;
  return (
    <div>
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
      </Card>
    </div>
  );
}
export default Course;
