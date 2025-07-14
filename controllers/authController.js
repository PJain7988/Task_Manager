import User from '../models/UserModel.js';

export const signup = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Username and password are required.' });

  const exists = User.find(user => user.username === username);
  if (exists) return res.status(400).json({ error: 'User already exists.' });

  User.push({ username, password });
  res.status(201).json({ message: 'User created successfully.' });
};

export const login = (req, res) => {
  const { username, password } = req.body;
  const user = User.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials.' });

  res.status(200).json({ message: 'Login successful.' });
};

export const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully.' });
};
