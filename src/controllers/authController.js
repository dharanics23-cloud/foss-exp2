const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-memory user store (replace with a database in a real application)
const users = [];

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    if (users.find(user => user.username === username)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = { id: users.length + 1, username, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and sign JWT
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
