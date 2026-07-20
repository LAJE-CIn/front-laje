// Interface para pegar os posts em markdown

interface Posts {
  slug: string;
  nome: string;
  cover: string;
  dataPublicacao?: string;
  content?: string;
}

export default Posts;
