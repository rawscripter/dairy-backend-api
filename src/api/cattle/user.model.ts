import * as z from 'zod';
import { db } from '../../db';
import { WithId } from 'mongodb';

export const User = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type User = z.infer<typeof User>;

export type UserWithId = WithId<User>;

export type UserWithOutPassword = Omit<User, 'password'>;

export const Users = db.collection<User>('users');
