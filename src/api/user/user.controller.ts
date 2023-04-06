import { NextFunction, Request, Response } from 'express';
import { User, Users, UserWithOutPassword } from './user.model';
import MessageResponse from '../../interfaces/MessageResponse';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export const login = async (req:Request<{}, {}, User>, res:Response<{}>, next:NextFunction) => {
  try {
    const { email, password } = req.body;
    const dbUser = await Users.findOne({ email: email });
    if (!dbUser) {
      return res.status(401).json({ message: 'User not found' });
    }
    const isPasswordValid = bcrypt.compareSync(password, dbUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'User not found' });
    }
    // create jwt token for user
    const token = jwt.sign({ id: dbUser._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: 'User logged in',
      token,
      user: <UserWithOutPassword> {
        _id: dbUser._id,
        name: dbUser.name,
        email: dbUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
};
