const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
const User = require("./models/userModel");
const { default: mongoose } = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(`DB Error : ${err}`));


// Register api
app.post("/register", async (req, res) => {
  const { username, password, fullName, email, gender, age } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      name: fullName,
      email,
      gender,
      age,
    });
    res
      .status(201)
      .json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Unable to register user", error: error.message });
  }
});

//Login api
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid user details" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    
    const token = jwt.sign({ email: user.email }, "jwt_token");
    res.json({ message: "Login successful", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Check user is authenticated or not
const authenticatedUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], 'jwt_token'); 
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

//Get all users
app.get("/users",authenticatedUser, async (req, res) => {
  try {
    const allUsers = await User.find({}, { name: 1, username: 1,gender:1,age:1 });
    res.json(allUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});


//Sample Api For all
app.get("/",(req,res)=>{
  res 
  .send(`
  <h1 style='text-align:center'>Route is running successfully
  Try /login, /register, /users</h1>
  `)
})

//Server is listenening
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
