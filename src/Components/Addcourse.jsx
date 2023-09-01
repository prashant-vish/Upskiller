import { TextField, Button, Card } from "@mui/material";
import axios from "axios";
import { useState } from "react";

function Addcourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImageLink] = useState("");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Card
        varint="outlined"
        style={{ width: 500, height: 400, padding: 20, marginTop: 50 }}
      >
        <TextField
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
          label="Image Link"
          variant="outlined"
          fullWidth
          onChange={(event) => {
            setImageLink(event.target.value);
          }}
        />
        <br />
        <br />
        <Button
          size="larger"
          variant="contained"
          onClick={async () => {
            await axios.post(
              "http://localhost:3000/admin/courses",
              {
                title: title,
                description: description,
                price: price,
                imageLink: image,
                published: true,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );

            alert("Course Added Successfully");
            // fetch("http://localhost:3000/admin/courses", {
            //   method: "POST",
            //   body: JSON.stringify({
            //     title: title,
            //     description: description,
            //     price: price,
            //     imageLink: image,
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
            //     alert("Course Added Successfully");
            //   });
          }}
        >
          ADD COURSE
        </Button>
      </Card>
    </div>
  );
}

export default Addcourse;
