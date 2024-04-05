const { z } = require('zod');


exports.validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body); // Validate request body against schema
      next(); // Move to next middleware
    } catch (error) {
      res.status(400).json({ error: error.errors }); // Respond with validation errors
    }
  };
};