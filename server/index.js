const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

mongoose.connect(
  "mongodb+srv://prashant-vish:mongoDBG.com@cluster0.s0lmx5p.mongodb.net/",
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "CourseDb" }
);

app.listen(3000, () => console.log("Server is listening at port 3000"));
