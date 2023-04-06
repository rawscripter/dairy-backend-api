import * as z from 'zod';
import { db } from '../../db';

export const User = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type User = z.infer<typeof User>;

export const Users = db.collection<User>('users');
