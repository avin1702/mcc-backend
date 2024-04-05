const { z } = require('zod');

// Define schema for login request body
exports.loginSchema = z.object({
  username: z.string(),
  password: z.string()
});

// module.exports = { loginSchema };
