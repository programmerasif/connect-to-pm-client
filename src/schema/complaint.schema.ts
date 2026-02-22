import { z } from "zod";

export const ComplaintSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  number: z.string().min(11, "Phone number must be at least 11 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ComplaintFormData = z.infer<typeof ComplaintSchema>;
