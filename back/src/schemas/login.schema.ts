// Importações

import z from 'zod';

// Schema de login

export const LoginSchema = z.object({
  user: z.string().min(1, 'Usuário não pode ser vazio'),
  password: z.string().min(1, 'Senha não pode ser vazia')
});
