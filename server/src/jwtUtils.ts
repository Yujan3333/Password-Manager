// jwtUtils.ts
import jwt from 'jsonwebtoken';
import config from './config'; // Import the config file


// Function to generate an access token with a given userId
export const generateAccessToken = (userId: string): string => {
  // Create an access token using jwt.sign
  // The token payload includes the userId
  // Use a secret key for signing the token (secret key yujan123)
  // Set an expiration time for the token (15 minutes)
  const accessToken = jwt.sign({ userId }, config.accessTokenKey, { expiresIn: '15m' });

  // Return the generated access token
  return accessToken;
};

// Function to generate a refresh token with a given userId
export const generateRefreshToken = (userId: string): string => {
  // Create a refresh token using jwt.sign
  // Similar to the access token, the payload includes the userId
  // Use a different secret key for the refresh token (secret key is yujan456)
  // Set a longer expiration time for the refresh token (7 days)
  const refreshToken = jwt.sign({ userId }, config.refreshTokenKey, { expiresIn: '7d' });

  // Return the generated refresh token
  return refreshToken;
};