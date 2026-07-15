// Importações

import { z } from 'zod';

// Schema central de jogo

export const JogoSchema = z.object({
  id: z.number().int(),
  nome: z.string().min(1, 'Nome é obrigatório'),
  participantes: z
    .array(z.string())
    .min(1, 'Deve haver pelo menos um participante'),
  gênero: z.string().min(1, 'Gênero é obrigatório'),
  descrição: z.string().min(1, 'Descrição é obrigatória'),
  eventos: z
    .array(
      z.object({
        id: z.number().int(),
        nome: z.string()
      })
    )
    .optional(),
  link: z.string().url('Link deve ser uma URL válida')
});

// Schemas extras de criação e update

export const CreateJogoSchema = JogoSchema.omit({ id: true, eventos: true });

export const UpdateJogoSchema = JogoSchema.omit({
  id: true,
  eventos: true
}).partial();

export type Jogo = z.infer<typeof JogoSchema>;
export type CreateJogo = z.infer<typeof CreateJogoSchema>;
export type UpdateJogo = z.infer<typeof UpdateJogoSchema>;
