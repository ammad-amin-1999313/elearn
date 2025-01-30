import User from "../../models/users/user.model.js";
import { generateToken } from "../../utils/jwt.js";
import bcrypt from "bcrypt";
import { OAuth2Client } from "node_modules/google-auth-library/build/src/index.js";

export const userSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with salt rounds = 10

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Save the hashed password
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token
    const token = generateToken(newUser._id);

    // Respond with the user and token
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  try {
    // Find user by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare provided password with stored hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(existingUser._id);

    // Respond with user info and token
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, sub: gooogleId } = ticket.getPayload();
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, gooogleId });
      await user.save();
    } else if (!user.gooogleId) {
      return res
        .status(400)
        .json({ message: "Email already registered. Use password login." });
    }

    const jwtToken = generateToken(user._id);
    res.statu(200).json({
      message: "Google login successful",
      user: { _id: user._id, name: user.name, email: user.email },
      token: jwtToken,
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(401).json({ message: "Invalid Google token" });
  }
};
