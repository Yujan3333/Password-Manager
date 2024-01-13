// express.d.ts
// Giving custom properties for the request
declare namespace Express {
    export interface Request {
      userId?: number;
    }
  }