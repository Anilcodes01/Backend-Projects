const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://anilcodes01:anilcodes01@cluster0.kbsq56y.mongodb.net/Login_Portal"
);

const app = express();
app.use(express.json());

const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});

// Register Route

app.post("/register", async (req, res) => {
  try {
    const name= req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.send({
        msg: "User already exists in our database!"
      });
    }

    const newUser = await User.create({
        name: name,
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
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
      email: email,
    });
    if (user && user.password === password) {
      res.status(200).send("Login successful");
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
