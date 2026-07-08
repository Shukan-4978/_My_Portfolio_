import rateLimit from 'express-rate-limit';

// General API limiter: 200 requests per 15 minutes
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
  skipSuccessfulRequests: false,
});

// Auth limiter: 5 requests per 15 minutes (prevent brute-force)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      'Too many authentication attempts. Please try again after 15 minutes.',
  },
  skipSuccessfulRequests: true, // Don't count successful logins against the limit
});

// Contact form limiter: 10 requests per hour
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      'You have sent too many messages. Please try again after an hour.',
  },
});
