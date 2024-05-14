import 'dotenv/config';
import express from 'express';
import routes from './routes.js'; 
import APIException from './utils/APIException.js';

const app = express();
const port = process.env.PORT || 3000;

// Loop through routes and register them
routes.forEach((route) => {
  app[route.method](route.path, route.controller);
});

// Error handling middleware for specific errors
app.use((err, req, res, next) => {
  if (err instanceof APIException) {
    res.status(err.statusCode).send(err.message);
    next(); // Let the process continue if needed
  } else {
    console.error('Server error:', err);
    res.status(500).send("An internal server error occurred.");
  }
});

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));