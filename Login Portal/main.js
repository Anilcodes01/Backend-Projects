const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')

mongoose.connect(
  "mongodb+srv://anilcodes01:anilcodes01@cluster0.kbsq56y.mongodb.net/Login_Portal"
);

const app = express();
app.use(express.json());
app.use(cors());

const User = mongoose.model("User", {
  username: String,
  email: String,
  password: String,
});

// Register Route

app.post("/register", async (req, res) => {
  try {
    const username= req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({error: 'User already exists!'})
    }

    const newUser = await User.create({
        username: username,
      email : email,
      password : password,
    });

    res.status(201).send("User registered successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  } 
});

// Login Route

app.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
      username: username,
    });
    if (user && user.password === password) {
      res.status(200).send("Login successful!");
    } else {
      res.status(401).send("Invalid username or password!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server Error!");
  }
});

app.listen(3000, (req, res) => {
  console.log("Server app listening on port 3000...");
});
