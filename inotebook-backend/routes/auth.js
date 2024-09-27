const express = require("express");
const User = require("../models/User"); // Assuming User model is in models directory
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getUser = require('../middleware/getUser');
const router = express.Router();
const JWT_SECRET = "iN0te800kSecReT"

//ROUTE-1: create a user using POST "/api/auth/createuser" No login required
router.post("/createuser",
  [
    body("name", "Enter a valid name.").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "The password must be atleast 8 characters.").isLength({min: 8})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      //if there are errors return bad request and error.
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let user = await User.findOne({ email: req.body.email });
      //Check whether a user with this email already exists
      if (user) {
        return res
          .status(400)
          .json({ message: "Sorry a user with this mail already exists" });
      }
      //password hashing
      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(req.body.password, salt);
      
      // Save user to the database
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePass,
      });

      const data = {
        user:{
          id: user.id
        }
      }

      //generating a JWT token
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({authToken}); //send the generated JWT token
    } catch (error) {
      console.error("Error adding user:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE-2: Authenticating user using login endpoint POST "/api/auth/login"
router.post("/login",
  [
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password cannot be empty.").exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      //if there are errors return bad request and error.
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {email, password} = req.body;
      let user = await User.findOne({email});
      //Check whether a user with this email already exists
      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid login credentials,please try logging in with valid credentials." });
      }

      //comparing the entered password with hashed pass in database
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ message: "Invalid login credentials,please try logging in with valid credentials." });
      }
      
      const data = {
        user:{
          id: user.id
        }
      }

      //generating a JWT token
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({authToken}); //send the generated JWT token
    } catch (error) {
      console.error("Error adding user:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE-3: Authenticating user using login endpoint POST "/api/auth/getuser" Login required
router.post("/getuser", getUser,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error("Error adding user:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
