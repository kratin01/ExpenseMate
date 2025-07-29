import jwt from 'jsonwebtoken';
import { genSalt, hash, compare } from 'bcryptjs';
import User from '../models/User.model.js';

// Function to generate a JWT for a user ID
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN // Token expiration from environment
  });
};

// @desc Register a new user
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // Step 1: Validate all required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Step 2: Check if a user already exists with this email
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Step 3: Hash the password before saving
    const salt = await genSalt(15); // Generate salt for hashing
    const hashedPassword = await hash(password, salt); // Create hashed password

    // Step 4: Create a new user in the database
    user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Step 5: Send back a JWT token and basic user details
    res.status(201).json({
      token: generateToken(user.id), // Generate authentication token
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// @desc Login an existing user
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Step 1: Validate input fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Step 2: Check if a user exists with this email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Step 3: Compare provided password with stored hashed password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Step 4: Send back a JWT token and basic user details
    res.json({
      token: generateToken(user.id), // Generate authentication token
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getCurrentUser(req, res) {
  try {
    // Find user by ID from token (auth middleware sets req.user.id)
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}