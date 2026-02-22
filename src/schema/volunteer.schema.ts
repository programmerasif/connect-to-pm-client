import { z } from "zod";

export const VolunteerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  number: z.string().min(11, "Phone number must be at least 11 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

export type VolunteerFormData = z.infer<typeof VolunteerSchema>;
