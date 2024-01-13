// // middleware/authMiddleware.ts
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import config from '../config';


  

// // used to add userId in the request
// export const auth = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ error: 'Unauthorized - No token provided' });
//     }

//     const decoded = jwt.verify(token, config.myTokenKey) as { userId: number };
//     if (!decoded.userId) {
//       return res.status(401).json({ error: 'Unauthorized - Invalid token' });
//     }

//     req.userId = decoded.userId; // Attach the user ID to the request object
//     next(); // Continue to the next middleware or route handler
//   } catch (error) {
//     if(error instanceof Error){
//     res.status(500).json({ error: error.message });
//   }}
// };
