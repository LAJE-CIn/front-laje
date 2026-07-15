// Importações

import { z } from 'zod';

// Schema central de evento

export const EventoSchema = z.object({
  id: z.number().int(),
  nome: z.string().min(1, 'Nome é obrigatório'),
  tipo: z.string().min(1, 'Tipo é obrigatório'),
  descrição: z.string().min(1, 'Descrição é obrigatória'),
  lista: z
    .array(
      z.object({
        id: z.number().int(),
        nome: z.string()
      })
    )
    .optional(),
  periodo: z.object({
    inicio: z.coerce.date(),
    fim: z.coerce.date()
  })
});

// Schemas extras de criação e update

export const CreateEventoSchema = EventoSchema.omit({ id: true, lista: true });

export const UpdateEventoSchema = EventoSchema.omit({
  id: true,
  lista: true
}).partial();

export type Evento = z.infer<typeof EventoSchema>;
export type CreateEvento = z.infer<typeof CreateEventoSchema>;
export type UpdateEvento = z.infer<typeof UpdateEventoSchema>;
