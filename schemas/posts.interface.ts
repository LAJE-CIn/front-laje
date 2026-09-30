// Interface para pegar os posts em markdown

interface Posts {
  slug: string;
  nome: string;
  cover: string;
  tipo: string;
  dataPublicacao: string;
  content?: string;
  participantes?: string;
  engine?: string;
  itchLink?: string;
}

export default Posts;
