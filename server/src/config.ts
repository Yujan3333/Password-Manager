import dotenv from "dotenv";

dotenv.config();

const config = {
  serverPort: process.env.SERVER_PORT || 8000,
  myTokenKey:process.env.MY_TOKEN_KEY || "yujan",
  accessTokenKey: process.env.ACCESS_TOKEN_KEY || "access",
  refreshTokenKey: process.env.REFRESH_TOKEN_KEY || "refresh",
};

export default config;