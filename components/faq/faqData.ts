export type FaqCategory =
  | 'Todas'
  | 'Sobre a LAJE'
  | 'Participação'
  | 'Projetos & Jogos'
  | 'Parcerias';

export const FAQ_CATEGORIES: { id: FaqCategory; label: string }[] = [
  { id: 'Todas', label: 'Todas' },
  { id: 'Sobre a LAJE', label: 'Sobre a LAJE' },
  { id: 'Participação', label: 'Participação' },
  { id: 'Projetos & Jogos', label: 'Projetos & Jogos' },
  { id: 'Parcerias', label: 'Parcerias' }
];

export interface FaqItem {
  id: string;
  category: Exclude<FaqCategory, 'Todas'>;
  question: string;
  answer: string;
  keywords?: string[];
}

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'o-que-e-a-laje',
    category: 'Sobre a LAJE',
    question: 'O que é a LAJE?',
    answer:
      'A Liga Acadêmica de Jogos Eletrônicos (LAJE) é uma organização estudantil fundada em novembro de 2025 e vinculada ao Centro de Informática (CIn) da Universidade Federal de Pernambuco (UFPE). Nosso objetivo é conectar estudantes de diversos cursos e áreas (programação, arte, música, game design e roteiro) para criar e publicar jogos digitais autorais, capacitar membros e fortalecer a indústria de games de Pernambuco.',
    keywords: ['o que é', 'quem somos', 'início', 'história', 'fundação', 'liga']
  },
  {
    id: 'orientadores',
    category: 'Sobre a LAJE',
    question: 'Quem são os professores orientadores da liga?',
    answer:
      'A LAJE conta com a orientação e suporte acadêmico dos professores Geber Ramalho e Giordano Cabral, docentes do Centro de Informática (CIn/UFPE) e referências no ensino de computação, inteligência artificial e jogos digitais no Brasil.',
    keywords: ['professores', 'orientador', 'geber', 'giordano', 'docentes']
  },
  {
    id: 'jogar-ou-desenvolver',
    category: 'Sobre a LAJE',
    question: 'A LAJE é focada em jogar ou em desenvolver jogos?',
    answer:
      'Nosso foco primordial é o desenvolvimento de jogos (Game Dev) — desde a concepção de mecânicas até a produção artística, musical e programação. No entanto, também promovemos sessões de playtest, eventos culturais de eSports e noites de jogatina para análise crítica e integração da comunidade.',
    keywords: ['jogar', 'desenvolver', 'esports', 'playtest', 'game dev']
  },
  {
    id: 'localizacao-fisica',
    category: 'Sobre a LAJE',
    question: 'Onde a LAJE fica localizada fisicamente?',
    answer:
      'Nossa base de atividades é no Centro de Informática (CIn) da UFPE, localizado na Av. Jornalista Aníbal Fernandes, s/n, na Cidade Universitária em Recife - PE. Nossos encontros ocorrem tanto nos laboratórios do CIn quanto virtualmente via Discord.',
    keywords: ['onde fica', 'endereço', 'localização', 'cin', 'ufpe', 'laboratório']
  },
  {
    id: 'quem-pode-participar',
    category: 'Participação',
    question: 'Quem pode participar da LAJE? Preciso ser aluno do CIn ou da UFPE?',
    answer:
      'Qualquer pessoa interessada em desenvolvimento de jogos pode participar! Estudantes de outros cursos da UFPE (como Design, Música, Letras, Cinema, Engenharias) são extremamente bem-vindos, pois jogos necessitam de talentos multidisciplinares. Também acolhemos colaboradores de outras universidades e da comunidade externa em nossos eventos e jams abertas.',
    keywords: ['quem pode', 'requisitos', 'cursos', 'design', 'música', 'externo']
  },
  {
    id: 'experiencia-previa',
    category: 'Participação',
    question: 'Preciso saber programar ou ter experiência prévia com jogos para entrar?',
    answer:
      'Não! Não é exigida experiência prévia avançada. A LAJE organiza trilhas de capacitação, oficinas práticas e projetos internos com mentoria para membros iniciantes. Se você tem paixão por games, vontade de aprender e comprometimento com o trabalho em equipe, há espaço para você.',
    keywords: ['experiência', 'iniciante', 'aprender', 'programar', 'saber']
  },
  {
    id: 'processo-seletivo',
    category: 'Participação',
    question: 'Como e quando acontecem os processos seletivos?',
    answer:
      'Nossos processos seletivos gerais ocorrem semestralmente, acompanhando o calendário acadêmico da UFPE. As vagas e etapas são divulgadas em nosso Instagram oficial (@laje.ufpe) e por comunicados nos murais e canais do CIn.',
    keywords: ['processo seletivo', 'entrar', 'inscrição', 'vagas', 'edital', 'quando']
  },
  {
    id: 'engines-e-ferramentas',
    category: 'Projetos & Jogos',
    question: 'Quais ferramentas e Game Engines são utilizadas nos projetos?',
    answer:
      'Utilizamos uma variedade de ferramentas de acordo com a proposta de cada jogo. Entre as mais frequentes estão Unity, Godot Engine, Unreal Engine e frameworks em C/C++ ou Python (muito comuns em projetos da disciplina de Introdução à Programação - IP). Na parte artística, utilizamos Aseprite, Blender, Photoshop, Krita e Reaper/FL Studio para áudio.',
    keywords: ['engine', 'unity', 'godot', 'unreal', 'python', 'c++', 'blender']
  },
  {
    id: 'game-jams',
    category: 'Projetos & Jogos',
    question: 'O que são as Game Jams e como a LAJE participa?',
    answer:
      'Game Jams são maratonas de desenvolvimento onde equipes criam um jogo completo do zero dentro de um prazo limitado (geralmente entre 48 horas e uma semana) seguindo um tema surpresa. A LAJE participa de jams globais (como Global Game Jam e Ludum Dare) e também organiza jams próprias abertas à comunidade acadêmica.',
    keywords: ['game jam', 'hackathon', 'maratona', 'global game jam', 'evento']
  },
  {
    id: 'jogos-gratuitos',
    category: 'Projetos & Jogos',
    question: 'Os jogos disponíveis no repositório são gratuitos?',
    answer:
      'Sim! Todos os jogos listados no Repositório da LAJE são gratuitos para jogar diretamente no navegador ou baixar. Eles representam o esforço criativo dos nossos membros e estudantes de disciplinas do CIn.',
    keywords: ['grátis', 'preço', 'pagar', 'jogar online', 'download']
  },
  {
    id: 'submeter-jogo',
    category: 'Projetos & Jogos',
    question: 'Como posso submeter um jogo feito por mim no repositório do site?',
    answer:
      'Se você é aluno da UFPE ou membro da comunidade e desenvolveu um jogo em uma disciplina (como IP), evento ou projeto independente, pode solicitar a inclusão no repositório. Envie os detalhes e link do projeto pelo nosso Instagram (@laje.ufpe) ou fale com a diretoria para avaliarmos a publicação no acervo oficial.',
    keywords: ['submeter', 'adicionar jogo', 'meu jogo', 'ip', 'publicar']
  },
  {
    id: 'parcerias-empresas',
    category: 'Parcerias',
    question: 'Como empresas, marcas ou estúdios podem propor projetos ou parcerias?',
    answer:
      'Estamos sempre abertos a colaborações com o ecossistema de tecnologia e inovação, incluindo o Porto Digital e estúdios de games locais. Empresas interessadas em propor desafios técnicos, palestras, mentorias ou patrocínio para a LAJE podem entrar em contato por mensagem direta no Instagram ou via canais de comunicação institucional do CIn/UFPE.',
    keywords: ['empresas', 'parceria', 'patrocínio', 'porto digital', 'estúdios']
  }
];

export const CATEGORY_STYLES: Record<
  Exclude<FaqCategory, 'Todas'>,
  { badge: string; border: string; text: string }
> = {
  'Sobre a LAJE': {
    badge: 'bg-green-500/20 text-green-300 border-green-500/40',
    border: 'border-green-500/30',
    text: 'text-green-400'
  },
  Participação: {
    badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    border: 'border-yellow-500/30',
    text: 'text-yellow-400'
  },
  'Projetos & Jogos': {
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    border: 'border-purple-500/30',
    text: 'text-purple-400'
  },
  Parcerias: {
    badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    border: 'border-blue-500/30',
    text: 'text-blue-400'
  }
};
