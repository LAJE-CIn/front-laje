/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig, s } from 'velite';
import fs from 'fs';

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/assets',
    base: '/assets/',
    name: '[name]-[hash:6].[ext]',
    clean: true
  },
  // Caso a quantidade de collections seja maior a gente pode criar um arquivo separado.
  collections: {
    eventos: {
      name: 'Evento',
      pattern: 'eventos/**/*.mdx',
      schema: s.object({
        slug: s.string(),
        nome: s.string().max(99),
        imagem: s.string(),
        dataPublicacao: s.isodate(),
        tipo: s.enum(['GameJams', 'Jogos de IP', 'Outros']),
        body: s.mdx()
      })
    },
    jogos: {
      name: 'Jogo',
      pattern: 'jogos/**/*.mdx',
      schema: s.object({
        slug: s.string(),
        nome: s.string().trim().max(99),
        imagem: s.string(),
        dataPublicacao: s.isodate(),
        eventos: s.array(s.string()).default([]),
        tipo: s.string().trim().toLowerCase(),
        body: s.mdx(),
        engine: s.string().trim().toLowerCase().optional(),
        authors: s.array(s.string().trim()).default([])
      })
    }
  },
  prepare: (collections) => {
    // Indice de eventos:
    // Para que o frontend não precise carregar TUDO na memória
    // Só o necessário para fazer uma busca ou exibir.
    const indiceEventos = collections.eventos.map(({ body: _, ...p }) => p);
    fs.writeFileSync(
      'public/indice-eventos.json',
      JSON.stringify(indiceEventos)
    );

    const indiceJogos = collections.jogos.map(({ body: _, ...p }) => p);
    fs.writeFileSync('public/indice-jogos.json', JSON.stringify(indiceJogos));
  }
});
