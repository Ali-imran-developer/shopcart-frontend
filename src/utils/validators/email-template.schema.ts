import { z } from 'zod';
import { messages } from '@config/messages';
import { validateEmail } from './common-rules';

export const emailTemplateSchema = z.object({
  name: z.string().min(1, { message: messages.nameIsRequired }),
  email: validateEmail,
  password: z.string().min(1, { message: messages.nameIsRequired }),
});

// generate form types from zod validation schema
export type EmailTemplateInput = z.infer<typeof emailTemplateSchema>;
