const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

// Replace with your MongoDB connection string
const mongoURI = 'mongodb+srv://sarojkumarbaral6338:aF8eHqtnbwWbqTQ2@cluster0.aeohzyh.mongodb.net/userdb?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define schema and model
const userSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  age: Number,
  details: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.post('/submit', async (req, res) => {
  try {
    const { name, dob, age, details } = req.body;
    const user = new User({ name, dob, age, details });
    await user.save();
    res.status(200).send('User saved successfully');
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).send('Server error');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
