import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from "../config";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  // Get the jwt token from the header
  const token = req.header('Authorization');
  if (!token) return res.status(403).json({ message: "No token provided" });

  // Try to validate the token and get data
  try {
    const jwtPayload = jwt.verify(token.split(" ")[1], config.TOKEN_SECRET);
    res.locals.jwtPayload = jwtPayload;
    next(); // Call the controller
  } catch (error) {
    // If token is not valid, respond with 401 (unauthorized)
    return res.status(401).json({ message: "Unauthorized!" });
  }
};