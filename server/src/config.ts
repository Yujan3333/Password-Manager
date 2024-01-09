import dotenv from "dotenv";

dotenv.config();

const config = {
  serverPort: process.env.SERVER_PORT || 8000,
  accessTokenKey: process.env.ACCESS_TOKEN_KEY || "access",
  refreshTokenKey: process.env.REFRESH_TOKEN_KEY || "refresh",
};

export default config;