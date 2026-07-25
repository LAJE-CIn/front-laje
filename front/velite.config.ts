import { defineConfig, s } from 'velite'
import fs from 'fs'

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/assets',
    base: '/assets/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
	// Caso a quantidade de collections seja maior a gente pode criar um arquivo separado.
  collections: {
    eventos: {
      name: 'Evento',
      pattern: 'eventos/**/*.mdx',
      schema: s
        .object({
					slug: s.string(),
          nome: s.string().max(99),
					imagem: s.path(),
          dataPublicacao: s.isodate(),
          tipo: s.enum(['GameJams', 'Jogos de IP', 'Outros']),
					body: s.mdx().optional(),
        }),
    },
		jogos: {
      name: 'Jogo',
      pattern: 'jogos/**/*.mdx',
      schema: s
        .object({
					slug: s.string(),
          nome: s.string().trim().max(99),
					imagem: s.path(),
          dataPublicacao: s.isodate(),
					eventos: s.array(s.string()).default([]),
          tipo: s.string().trim().toLowerCase(), 
					body: s.mdx().optional(),
        }),
    }
  },
	prepare: (collections) => {
		// Indice de eventos:
		// Para que o frontend não precise carregar TUDO na memória
		// Só o necessário para fazer uma busca ou exibir.
    const indiceEventos = collections.eventos.map((p) => ({
			slug: p.slug,
      nome: p.nome,
			dataPublicacao: p.dataPublicacao,
			// a imagem não é necessária pra busca 
			// mas precisa estar junto pra visualização da busca
			imagem: p.imagem, 
			tipo: p.tipo 
    }))
    // Desativado por agora, vamos precisar quando for implementar a busca.
    // fs.writeFileSync('public/indice-eventos.json', JSON.stringify(indiceEventos))
    
		const indiceJogos = collections.jogos.map((p) => ({
      slug: p.slug,
			eventos: p.eventos,
      nome: p.nome,
			dataPublicacao: p.dataPublicacao,
			imagem: p.imagem, 
			tipo: p.tipo 
    }))
    // Desativado por agora, vamos precisar quando for implementar a busca.
    // fs.writeFileSync('public/indice-jogos.json', JSON.stringify(indiceJogos))
  }
})