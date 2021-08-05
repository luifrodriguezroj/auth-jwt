import { Request, Response } from 'express'
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { omit } from "lodash";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";
import config from "../config";

export const signUp = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Creating a new User Object
    const newUser = await getRepository(User).create(req.body);

    //Validade if the parameters are ok
    const errors = await validate(newUser);
    if (errors.length > 0) return res.status(400).send(errors);

    // Saving the User Object in PostgreSQL
    const results = await getRepository(User).save(newUser);

    // Get user
    const user = JSON.parse(JSON.stringify(results));

    // Create a token
    const token: string = jwt.sign({ _id: user.id }, config.TOKEN_SECRET, {
      expiresIn: 60 * 60 * 24 // 24 hours
    });
    return res.header('auth-token', token).json(omit(user, "password", "id", "createdAt", "updatedAt"));
  } catch (error) {
    console.log(error);
    return res.status(409).json({ message: "username or email already in use" });
  }
}

export const signIn = async (req: Request, res: Response) => {
  try {
    // Get user
    const userFound = await getRepository(User).findOne({ username: req.body.username });
    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    // Check if encrypted password match  
    if (await userFound.correctPassword(req.body.password, userFound.password)) {
      // Sing JWT, valid for 24 hours
      const token: string = jwt.sign({ _id: userFound.id }, config.TOKEN_SECRET, {
        expiresIn: 60 * 60 * 24 // 24 hours
      });
      return res.header('auth-token', token).json(omit(userFound, "password", "id", "createdAt", "updatedAt"));
    } else {
      res.status(400).json({ message: "Invalid Password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    // Get user
    const results = await getRepository(User).findOne(res.locals.jwtPayload._id);
    return res.json(omit(results, "password", "id", "createdAt", "updatedAt"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};