// User → POST /api/register → authRoutes.js → registerUser() in authcontrollers.js
//                     ↓
//                MongoDB + JWT

const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT token with explicit algorithm
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
    algorithm: 'HS256'
  });
};

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
const isValidPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  return password.length >= 8 &&
         /[A-Z]/.test(password) &&
         /[a-z]/.test(password) &&
         /[0-9]/.test(password);
};

// Register User
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageURL } = req.body;

  // Check for missing fields
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Please enter a valid email address" });
  }

  // Validate password strength
  if (!isValidPassword(password)) {
    return res.status(400).json({
      message: "Password must be at least 8 characters with uppercase, lowercase, and number"
    });
  }

  // Normalize email to lowercase
  const normalizedEmail = email.toLowerCase().trim();

  try {
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already taken" });
    }

    // Create the user with normalized email
    const user = await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password,
      profileImageURL,
    });

    // Don't send password in response
    const userResponse = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImageURL: user.profileImageURL
    };

    res.status(201).json({
      id: user._id,
      user: userResponse,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Normalize email to lowercase
  const normalizedEmail = email.toLowerCase().trim();

  try {
    const user = await User.findOne({ email: normalizedEmail });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Don't send password in response
    const userResponse = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImageURL: user.profileImageURL
    };

    res.status(200).json({
      id: user._id,
      user: userResponse,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
};
// Get User Info
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user information" });
  }
};
