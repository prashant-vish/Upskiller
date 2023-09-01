const express = require("express");
const mongoose = require("mongoose");

const { User, Admin, Course } = require("../db/index");
const jwt = require("jsonwebtoken");

const { generateJwtAdmin } = require("../middleware/auth");
const { authenticateJwtAdmin } = require("../middleware/auth");

const router = express.Router();
router.get("/me", authenticateJwtAdmin, async (req, res) => {
  if (!req.admin) {
    return res.status(404).json({ msg: "Admin Doesn't Exist!" });
  }
  const admin = await Admin.findOne({ username: req.admin.admin });
  res.json({ username: admin.username });
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    console.log("hiii from signup route");
    res.json({ message: "Admin Already Exists" });
  } else {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = generateJwtAdmin(newAdmin);
    res.send({ message: "Admin created Successfully", token: token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });

  if (admin) {
    const token = generateJwtAdmin(admin);
    res.send({ message: "Admin logged in Successfully", token: token });
  } else {
    console.log("axios");
    res.send({ token: "0" });
  }
});

router.post("/courses", authenticateJwtAdmin, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.send({ message: "Course Created Successfully", id: course.id });
});

router.put("/courses/:courseId", authenticateJwtAdmin, async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findByIdAndUpdate(courseId, req.body);
  if (course) {
    res.json({ message: "Course Updated Successfully!" });
  } else {
    res.status(403).json({ message: "Course doesn't Exists" });
  }
});

router.get("/courses", authenticateJwtAdmin, async (req, res) => {
  const courses = await Course.find({});
  if (courses) {
    res.json({ courses: courses });
  } else {
    res.json({ message: "No Course Exists" });
  }
});

router.get("/course/:courseId", authenticateJwtAdmin, async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  res.json({ course });
});

module.exports = router;
