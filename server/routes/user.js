const express = require("express");
const mongoose = require("mongoose");

const { User, Admin, Course } = require("../db/index");
const jwt = require("jsonwebtoken");

const { generateJwtUser } = require("../middleware/auth");
const { authenticateJwtUser } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.json({ message: "User Already Exists" });
  } else {
    const obj = { username: username, password: password };
    const newUser = await User.create(obj);
    const token = generateJwtUser(newUser);
    res.json({ message: "User Created Successfully!", token: token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = generateJwtUser(user);
    res.json({ message: "User Created Successfully", token: token });
  } else {
    res.status(403).json({ message: "Incorrect username or password" });
  }
});

router.get("/courses", authenticateJwtUser, async (req, res) => {
  const courses = await Course.find({ published: true });
  if (courses) {
    res.send({ Course: courses });
  } else {
    res.json({ message: "No Course Published Yet" });
  }
});

router.post("/courses/:courseId", authenticateJwtUser, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    console.log(course);
    if (course) {
      const user = await User.findOne({ username: req.user.username });
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "Course purchased Successfully!" });
    } else {
      res.status(404).json({ message: "Course Doesn't Exists!!" });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: "Invalid Course id format" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

router.get("/purchasedCourses", authenticateJwtUser, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  res.json({ purchasedCourses: user.purchasedCourses || [] });
});

module.exports = router;
