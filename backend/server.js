// Import necessary modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/authroutes');
const videoRoutes = require('./routes/videoRoutes');
const data = require('./routes/dataroutes');
// const predictionRoutes = require('./routes/predictroute');

// Load environment variables
dotenv.config();

// Create the Express app
const app = express();

// Middleware
app.use(cors());  // For Cross-Origin Resource Sharing
app.use(express.json());  // To parse JSON bodies

// Static files (for serving images or processed videos if needed)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect('mongodb://localhost:27017/face_detection', { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/user', data); 
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/videos', videoRoutes);  // Video upload and processing routes
// app.use('/api/predictions', predictionRoutes);  // Prediction and results routes





// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const authRoutes = require('./routes/authroutes');
// const videoRoutes = require('./routes/videoRoutes');
// const predictionRoutes = require('./routes/predictroute');
// const { loadModel } = require('./controllers/predict');  // Ensure this path is correct

// dotenv.config();
// // Initialize the server
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Database connection
// mongoose.connect('mongodb://localhost:27017/face_detection', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Load the model before starting the server
// loadModel().then(() => {
//     console.log('Model loaded successfully');

//     // Routes
//     app.use('/api/auth', authRoutes);
//     app.use('/api/videos', videoRoutes);
//     app.use('/api/predictions', predictionRoutes);

//     // Start the server
//     app.listen(5000, () => {
//         console.log('Server is running on port 5000');
//     });
// }).catch(err => {
//     console.error('Error loading the model:', err);
//     process.exit(1);  // Exit the process if model loading fails
// });
