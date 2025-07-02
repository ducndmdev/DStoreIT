"use client";

import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(1).max(255),
});
