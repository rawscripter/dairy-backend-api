import { NextFunction, Request, Response } from 'express';
import { User, Users } from './user.model';
import MessageResponse from '../../interfaces/MessageResponse';
import bcrypt from 'bcrypt';

export const register = async (req:Request<{}, MessageResponse, User>, res:Response<MessageResponse>, next:NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await Users.insertOne({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    next(err);
  }
};

export const login = async (req:Request<{}, MessageResponse, User>, res:Response<MessageResponse>, next:NextFunction) => {
  try {
    const { email, password } = req.body;
    const dbUser = await Users.findOne({ email: email });
    if (!dbUser) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = bcrypt.compareSync(password, dbUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    next(err);
  }
};
