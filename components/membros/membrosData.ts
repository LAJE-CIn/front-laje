export type MemberSection = 'todos' | 'procedimentos' | 'regras' | 'formularios' | 'comunicacao';

export interface ProceedingItem {
  id: string;
  title: string;
  category: 'Desenvolvimento' | 'Gestão & Sprints' | 'Infraestrutura' | 'Acadêmico';
  description: string;
  steps: string[];
  tips?: string;
  tag: string;
}

export interface RuleItem {
  id: string;
  title: string;
  category: 'Conduta' | 'Propriedade Intelectual' | 'Engajamento' | 'Marca & Imagem';
  summary: string;
  details: string[];
  highlight: string;
}

export interface FormItem {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  badge?: string;
}

export interface CommunicationChannel {
  id: string;
  name: string;
  platform: 'Discord' | 'WhatsApp' | 'GitHub' | 'Google Workspace' | 'Instagram' | 'E-mail';
  badge: string;
  description: string;
  focus: string;
  primaryLink: string;
  secondaryAction?: {
    label: string;
    valueToCopy: string;
  };
  rulesOfThumb: string[];
}

export interface QuickResource {
  id: string;
  title: string;
  type: 'Template' | 'Guia' | 'Assets' | 'Documento';
  description: string;
  fileFormat: string;
  downloadOrUrl: string;
}

export interface BoardContact {
  role: string;
  names: string;
  department: string;
  contact: string;
}

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// ==========================================
// 1. PROCEDIMENTOS INTERNOS
// ==========================================
export const PROCEEDINGS_DATA: ProceedingItem[] = [
  {
    id: 'pipeline-desenvolvimento',
    title: 'Pipeline de Desenvolvimento de Jogos',
    category: 'Desenvolvimento',
    tag: 'Game Dev Lifecycle',
    description:
      'Todo jogo oficial desenvolvido sob a bandeira da LAJE passa por 5 fases fundamentais para garantir viabilidade técnica, artística e publicação.',
    steps: [
      '1. Ideação & Pitch: Concepção da mecânica principal, público-alvo e apresentação preliminar no Pitch Day.',
      '2. Pré-Produção & GDD: Criação do Game Design Document simplificado (mecânicas, escopo, arte conceitual e cronograma).',
      '3. Produção em Sprints: Ciclos de desenvolvimento quinzenais com entregas incrementais jogáveis.',
      '4. Playtesting & QA: Sessões de testes abertas com outros membros da liga para balanceamento e correção de bugs.',
      '5. Publicação & Portfólio: Cadastro pelo formulário oficial de jogos, publicação no itch.io e repositório do site.'
    ],
    tips: 'Valide sempre a fatia vertical (vertical slice) ou protótipo jogável do core loop antes de expandir o escopo do jogo.'
  },
  {
    id: 'submissao-novo-projeto',
    title: 'Como Iniciar e Submeter um Novo Projeto',
    category: 'Desenvolvimento',
    tag: 'Pitch & Criação',
    description:
      'Qualquer membro ativo pode liderar ou propor a criação de um jogo na LAJE, desde que haja equipe multidisciplinar mínima.',
    steps: [
      'Apresente sua proposta no Pitch Day ou para a equipe de mentores da LAJE.',
      'Forme a equipe multidisciplinar mínima (ao menos 1 programador e 1 artista/designer).',
      'Com o squad montado, solicite a criação do canal exclusivo no Discord e do repositório oficial no GitHub.',
      'Quando o jogo estiver em fase jogável ou pronto para lançamento, preencha o Formulário de Cadastramento de Jogos.'
    ],
    tips: 'Projetos com escopo bem delimitado e foco em polimento mecânico têm taxa de conclusão muito mais alta.'
  },
  {
    id: 'metodologia-sprints',
    title: 'Metodologia de Sprints e Reuniões de Alinhamento',
    category: 'Gestão & Sprints',
    tag: 'Scrum / Agile',
    description:
      'Utilizamos uma adaptação ágil pensada para o ritmo acadêmico da UFPE, equilibrando estudos e desenvolvimento prático.',
    steps: [
      'Sprints Quinzenais: Planejamento a cada duas semanas definindo tarefas prioritárias no Kanban.',
      'Check-in Semanal Assíncrono: Cada membro compartilha no canal da sua squad no Discord seu progresso e impedimentos.',
      'Reunião Geral Mensal: Encontro com toda a liga para anúncios institucionais, capacitações e alinhamentos.',
      'Sprint Review: Demonstração do progresso e feedback construtivo entre as equipes.'
    ],
    tips: 'Em semanas de provas na faculdade, comunique sua equipe com antecedência para readequar as metas.'
  },
  {
    id: 'git-versionamento',
    title: 'Padrão de Versionamento & Boas Práticas no GitHub',
    category: 'Infraestrutura',
    tag: 'Git & DevOps',
    description:
      'Regras fundamentais de controle de versão para evitar conflitos de merge, perda de commits e estouro de arquivos pesados de assets.',
    steps: [
      'Git LFS Obrigatório: Todos os repositórios que utilizam engines com assets binários (texturas, áudios, 3D) devem usar Git LFS.',
      'Ramificação (Branches): A branch "main" é estável. Crie branches descritivas (ex: "feature/movimento", "fix/colisao").',
      'Pull Requests com Review: Nenhuma alteração sobe diretamente na "main" sem a aprovação de outro colega da equipe.',
      'Commits Semânticos: Utilize prefixos convencionais: feat:, fix:, docs:, style:, refactor:, chore:.'
    ],
    tips: 'Adicione sempre arquivos temporários e pastas de build (.import, Library, Binaries) ao .gitignore.'
  },
  {
    id: 'uso-espacos-cin',
    title: 'Uso dos Laboratórios e Espaços Físicos no CIn',
    category: 'Infraestrutura',
    tag: 'Salas & CIn',
    description:
      'A LAJE conta com apoio institucional e tem acesso autorizado a salas e computadores no Centro de Informática.',
    steps: [
      'Salas de Reunião: Agendamento prévio com 48h de antecedência via formulário da diretoria.',
      'Laboratórios de Informática: Uso das máquinas do CIn exclusivo para membros com vínculo ativo na UFPE.',
      'Cuidado com Equipamentos: Não consumir alimentos nem bebidas abertas próximo aos computadores e mesas digitalizadoras.',
      'Horário de Funcionamento: Atividades presenciais devem respeitar o funcionamento do campus (até 22h).'
    ],
    tips: 'Para maratonas de fim de semana ou game jams presenciais, a diretoria solicita autorização institucional prévia.'
  },
  {
    id: 'horas-complementares',
    title: 'Aproveitamento de Horas de Extensão Acadêmica',
    category: 'Acadêmico',
    tag: 'UFPE / CIn',
    description:
      'Como transformar sua dedicação na liga em horas de extensão curricular obrigatórias para graduação na UFPE.',
    steps: [
      'Critério de Assiduidade: Ter presença confirmada nas reuniões e atividades práticas registradas no semestre.',
      'Relatório de Atividades: Preencha o formulário de horas listando seus projetos e funções desempenhadas.',
      'Validação Docente: O relatório é submetido e assinado pelos professores orientadores da LAJE.',
      'Certificado Oficial: A declaração é emitida para cadastro de créditos complementares no SIGA/UFPE.'
    ],
    tips: 'Mantenha os links de seus commits, PRs e jogos publicados organizados para facilitar a emissão da declaração.'
  }
];

// ==========================================
// 2. REGRAS & ESTATUTO
// ==========================================
export const RULES_DATA: RuleItem[] = [
  {
    id: 'codigo-conduta',
    title: 'Código de Convivência, Ética & Respeito Mútuo',
    category: 'Conduta',
    summary:
      'A LAJE é um espaço plural, seguro e colaborativo. Prezamos pelo respeito incondicional a todas as pessoas participantes.',
    details: [
      'Tolerância Zero a Discriminação: Preconceito por raça, etnia, gênero, orientação sexual, crença ou classe é motivo para desligamento imediato.',
      'Comunicação Construtiva: Críticas sobre arte, código ou game design devem ter foco estritamente profissional e respeitoso.',
      'Ambiente Seguro: Proibido spam, conteúdo ilícito, NSFW ou condutas inadequadas em qualquer canal oficial da liga.',
      'Apoio a Iniciantes: Membros experientes devem incentivar e acolher quem está dando os primeiros passos no desenvolvimento de jogos.'
    ],
    highlight: 'Divergências criativas enriquecem os jogos; desrespeito não é tolerado em hipótese alguma.'
  },
  {
    id: 'propriedade-intelectual',
    title: 'Propriedade Intelectual & Direitos dos Criadores',
    category: 'Propriedade Intelectual',
    summary:
      'Na LAJE, o protagonismo é dos estudantes: os jogos autorais pertencem aos seus respectivos desenvolvedores.',
    details: [
      'Titularidade Autoral: A propriedade intelectual, conceitos e assets autorais desenvolvidos pertencem exclusivamente aos criadores.',
      'Licença de Exibição Institucional: Os desenvolvedores autorizam a exibição não-comercial do jogo no site, repositório e mostras acadêmicas da LAJE/CIn.',
      'Créditos Obrigatórios: O jogo e seus materiais promocionais devem incluir o logotipo da LAJE e menção ao apoio do CIn/UFPE.',
      'Comercialização Livre: A equipe é totalmente livre para publicar, distribuir ou comercializar o jogo externamente (Steam, itch.io, consoles).'
    ],
    highlight: 'O jogo é da sua equipe. A LAJE fomenta sua produção sem reivindicar seus direitos autorais.'
  },
  {
    id: 'assiduidade-permanencia',
    title: 'Critérios de Assiduidade, Entregas & Permanência',
    category: 'Engajamento',
    summary:
      'O bom andamento dos projetos depende do compromisso mútuo entre todos os membros de cada squad.',
    details: [
      'Frequência Mínima: Participação nas reuniões gerais e alinhamentos internos da equipe.',
      'Compromisso com o Squad: Entregar as tarefas combinadas nas sprints ou justificar impedimentos antes do prazo.',
      'Afastamento Temporário: Em períodos de sobrecarga acadêmica, TCC ou estágio, solicite licença temporária sem perder o vínculo.',
      'Comunicação Prévia: Avisar com antecedência eventuais imprevistos é fundamental para o planejamento da equipe.'
    ],
    highlight: 'A vida acadêmica é prioridade. Comunique seu squad se precisar desacelerar em períodos de provas.'
  },
  {
    id: 'uso-da-marca',
    title: 'Uso da Marca, Identidade Visual & Redes Sociais',
    category: 'Marca & Imagem',
    summary:
      'Diretrizes visuais para representar a liga com consistência em eventos, game jams e comunicações públicas.',
    details: [
      'Assets Oficiais: Utilize apenas as versões vetorizadas (.SVG) ou em alta resolução (.PNG) do logotipo oficial da LAJE.',
      'Cores e Tipografia: Nossas cores institucionais são Preto, Verde Neon e Cinza Escuro. Fonte de destaque: Pixelify Sans.',
      'Representação em Jams: Ao participar de Game Jams externas, recomendamos utilizar a tag "[LAJE]" no nome da equipe ou nos créditos do itch.io.',
      'Manifestações Públicas: Declarações à imprensa ou parcerias institucionais são de responsabilidade da gestão da liga.'
    ],
    highlight: 'Consulte o Kit de Identidade Visual para obter arquivos vetorizados e paleta de cores oficial.'
  },
  {
    id: 'sigilo-projetos-empresas',
    title: 'Sigilo & Projetos Especiais em Parceria (NDA)',
    category: 'Conduta',
    summary:
      'Normas de conduta e discrição para projetos executados em parceria com empresas ou instituições externas.',
    details: [
      'Acordo de Confidencialidade: Projetos patrocinados ou sob contrato exigem sigilo de mecânicas e builds até autorização da empresa.',
      'Proteção de Arquivos: Não divulgar builds de teste, credenciais de acesso ou trechos de código em redes públicas sem permissão.',
      'Responsabilidade Coletiva: O cumprimento do sigilo resguarda a credibilidade de toda a comunidade acadêmica do CIn.'
    ],
    highlight: 'Em caso de dúvida sobre o que pode ser compartilhado publicamente, consulte a gestão.'
  }
];

// ==========================================
// 3. FORMULÁRIOS INTERNOS (LINKS DIRETOS)
// ==========================================
export const FORMS_DATA: FormItem[] = [
  {
    id: 'form-cadastro-jogos',
    title: 'Cadastramento de Jogos',
    category: 'Jogos & Repositório',
    description:
      'Cadastre seu jogo autoral desenvolvido na LAJE para inclusão no repositório oficial, catálogo do site e canais de divulgação.',
    url: 'https://forms.gle/EuZBPB1k5td81s3e6',
    badge: 'Principal'
  },
  {
    id: 'form-horas-extensao',
    title: 'Solicitação de Horas de Extensão',
    category: 'Acadêmico',
    description:
      'Requerimento de declaração de horas de extensão curricular (UFPE/CIn) com base nas entregas e participação no semestre.',
    url: 'https://forms.gle/EuZBPB1k5td81s3e6',
    badge: 'Extensão'
  },
  {
    id: 'form-equipamentos-salas',
    title: 'Reserva de Salas & Equipamentos',
    category: 'Infraestrutura',
    description:
      'Solicitação para reserva de salas de reunião no CIn, mesas digitalizadoras e equipamentos para playtest presencial.',
    url: 'https://forms.gle/EuZBPB1k5td81s3e6',
    badge: 'CIn / UFPE'
  },
  {
    id: 'form-ouvidoria-feedback',
    title: 'Ouvidoria & Feedback Interno',
    category: 'Comunidade',
    description:
      'Canal seguro para envio de dúvidas, sugestões para a gestão da LAJE ou relatos confidenciais sobre a convivência interna.',
    url: 'https://forms.gle/EuZBPB1k5td81s3e6',
    badge: 'Sugestões'
  }
];

// ==========================================
// 4. MEIOS DE COMUNICAÇÃO
// ==========================================
export const CHANNELS_DATA: CommunicationChannel[] = [
  {
    id: 'canal-discord',
    name: 'Discord Oficial da LAJE',
    platform: 'Discord',
    badge: 'Hub Principal • Diário',
    description:
      'Nosso quartel-general digital. Onde acontecem as conversas diárias, calls de desenvolvimento, sessões de coworking e avisos.',
    focus: 'Comunicação síncrona, canais por squad, chamadas de voz e playtests.',
    primaryLink: 'https://discord.gg/laje-ufpe',
    secondaryAction: {
      label: 'Copiar Convite Discord',
      valueToCopy: 'https://discord.gg/laje-ufpe'
    },
    rulesOfThumb: [
      'Mantenha seu apelido no servidor no formato: "Seu Nome | Squad / Função".',
      'Utilize os canais de voz de desenvolvimento para programar e desenhar com os colegas.',
      'Mantenha o microfone mutado ao entrar em reuniões com múltiplos participantes.'
    ]
  },
  {
    id: 'canal-whatsapp',
    name: 'Grupos Oficiais no WhatsApp',
    platform: 'WhatsApp',
    badge: 'Avisos da Gestão',
    description:
      'Canal para comunicados de alta prioridade da diretoria e grupos individuais de squads ativos para contato rápido.',
    focus: 'Lembretes de reuniões, avisos institucionais e alinhamentos rápidos.',
    primaryLink: 'https://chat.whatsapp.com/invite-laje-membros-placeholder',
    secondaryAction: {
      label: 'Copiar Link WhatsApp',
      valueToCopy: 'https://chat.whatsapp.com/invite-laje-membros-placeholder'
    },
    rulesOfThumb: [
      'O grupo principal possui avisos da gestão para manter a informação organizada.',
      'Discussões aprofundadas e arquivos pesados devem ser compartilhados no Discord.'
    ]
  },
  {
    id: 'canal-github',
    name: 'GitHub Organization (LAJE-CIn)',
    platform: 'GitHub',
    badge: 'Código & Repositórios',
    description:
      'Organização central onde os repositórios dos jogos, templates de engines e documentações técnicas são hospedados.',
    focus: 'Controle de versão, pull requests, issues e templates de código.',
    primaryLink: 'https://github.com/LAJE-CIn',
    secondaryAction: {
      label: 'Copiar Nome da Organização',
      valueToCopy: 'LAJE-CIn'
    },
    rulesOfThumb: [
      'Peça a inclusão do seu usuário no time da LAJE no GitHub com seu e-mail institucional.',
      'Nunca realize push forçado (git push -f) na branch main.'
    ]
  },
  {
    id: 'canal-drive',
    name: 'Google Drive Compartilhado',
    platform: 'Google Workspace',
    badge: 'Docs & Assets',
    description:
      'Espaço em nuvem com templates de Game Design Document (GDD), atas, apresentações e kit de identidade visual.',
    focus: 'GDDs colaborativos, cronogramas e pastas de assets brutos.',
    primaryLink: 'https://drive.google.com/drive/folders/laje-ufpe-shared',
    secondaryAction: {
      label: 'Copiar Link do Drive',
      valueToCopy: 'https://drive.google.com/drive/folders/laje-ufpe-shared'
    },
    rulesOfThumb: [
      'Acesse com seu e-mail institucional @cin.ufpe.br ou @ufpe.br para ter permissão de edição.',
      'Organize as pastas da sua equipe por data e versão de assets.'
    ]
  },
  {
    id: 'canal-instagram',
    name: 'Instagram (@laje.ufpe)',
    platform: 'Instagram',
    badge: 'Rede Social & Vitrine',
    description:
      'Canal público para divulgação de jogos criados, registros de eventos, game jams e conexão com a indústria.',
    focus: 'Divulgação dos jogos, fotos de encontros e trailers de projetos da liga.',
    primaryLink: 'https://www.instagram.com/laje.ufpe/',
    secondaryAction: {
      label: 'Copiar @ do Instagram',
      valueToCopy: '@laje.ufpe'
    },
    rulesOfThumb: [
      'Marque @laje.ufpe quando publicar bastidores de desenvolvimento dos jogos.',
      'Compartilhe os lançamentos de jogos dos colegas de liga!'
    ]
  },
  {
    id: 'canal-email',
    name: 'E-mail Oficial da LAJE',
    platform: 'E-mail',
    badge: 'Propósitos Gerais',
    description:
      'Canal formal para contatos acadêmicos, comunicação institucional com o CIn/UFPE e parcerias.',
    focus: 'Contato institucional e assuntos de coordenação geral.',
    primaryLink: 'mailto:laje@cin.ufpe.br',
    secondaryAction: {
      label: 'Copiar E-mail da LAJE',
      valueToCopy: 'laje@cin.ufpe.br'
    },
    rulesOfThumb: [
      'Utilize seu e-mail institucional ao enviar mensagens formais.',
      'Para dúvidas sobre matérias e créditos, mencione sua matrícula no assunto.'
    ]
  }
];

// ==========================================
// 5. RECURSOS RÁPIDOS & DOWNLOADS
// ==========================================
export const QUICK_RESOURCES_DATA: QuickResource[] = [
  {
    id: 'res-gdd-template',
    title: 'Template de GDD LAJE (Game Design Doc)',
    type: 'Template',
    fileFormat: 'Google Docs / Markdown',
    description: 'Documento estruturado contendo seções de core loop, mecânicas, narrativa, direção de arte e requisitos técnicos.',
    downloadOrUrl: 'https://docs.google.com/document/d/laje-gdd-template-placeholder'
  },
  {
    id: 'res-pitch-deck',
    title: 'Template de Slides para Pitch de Jogos',
    type: 'Template',
    fileFormat: 'Google Slides / PPTX',
    description: 'Apresentação com os tópicos essenciais para defender a ideia do seu jogo de forma concisa.',
    downloadOrUrl: 'https://docs.google.com/presentation/d/laje-pitch-template-placeholder'
  },
  {
    id: 'res-kit-marca',
    title: 'Kit de Marca & Identidade Visual LAJE',
    type: 'Assets',
    fileFormat: 'Arquivos .PNG e .SVG',
    description: 'Logos vetorizados em alta resolução e paleta de cores oficial da liga para uso nos jogos e trailers.',
    downloadOrUrl: '/icon.png'
  },
  {
    id: 'res-git-guide',
    title: 'Guia Rápido de Git, LFS & Commits',
    type: 'Guia',
    fileFormat: 'Referência GitHub',
    description: 'Folha de dicas com comandos essenciais do Git LFS e padrão de Conventional Commits.',
    downloadOrUrl: 'https://github.com/LAJE-CIn'
  }
];

// ==========================================
// CONTATOS DE REFERÊNCIA
// ==========================================
export const BOARD_CONTACTS: BoardContact[] = [
  {
    role: 'Professores Orientadores',
    names: 'Geber Ramalho & Giordano Cabral',
    department: 'Centro de Informática (CIn / UFPE)',
    contact: 'gldr@cin.ufpe.br | grc@cin.ufpe.br'
  },
  {
    role: 'E-mail para Propósitos Gerais',
    names: 'LAJE - Liga Acadêmica de Jogos Eletrônicos',
    department: 'Centro de Informática (CIn / UFPE)',
    contact: 'laje@cin.ufpe.br'
  }
];
