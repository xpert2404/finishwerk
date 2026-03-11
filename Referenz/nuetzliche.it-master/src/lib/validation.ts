import {z} from "zod";

export const contactSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(15),
  websiteHoney: z.string().optional()
});

export type ContactFields = z.infer<typeof contactSchema>;
