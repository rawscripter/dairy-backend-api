import { z } from 'zod';
export default interface requestValidators {
  body?: z.AnyZodObject;
  query?: z.AnyZodObject;
  params?: z.AnyZodObject;
}
