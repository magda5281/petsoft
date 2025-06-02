import { z } from 'zod';
import { DEFAULT_PET_IMAGE } from './constants';

export const petIdSchema = z.string().trim().cuid();

export const petFormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }).max(20),
  ownerName: z.string().trim().min(1, { message: 'Name is required' }).max(100),
  imageUrl: z
    .union([
      z.literal(''),
      z.string().trim().url({ message: 'Image url must be a valid url' }),
    ])
    .transform((val) => (val === '' ? DEFAULT_PET_IMAGE : val)),
  age: z.coerce
    .number()
    .int()
    .positive()
    .max(99999, { message: 'Age must be valid number' }),
  notes: z.union([
    z.literal(''),
    z.string().trim().max(1000, { message: 'Enter maximum 1000 characters' }),
  ]),
});
export type TPetForm = z.infer<typeof petFormSchema>;
