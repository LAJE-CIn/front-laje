import type { Metadata } from 'next';
import PageContainer from '@/components/shared/PageContainer';
import MembersHub from '@/components/membros/MembersHub';

export const metadata: Metadata = {
  title: 'Área do Membro | LAJE - Liga Acadêmica de Jogos Eletrônicos',
  description:
    'Portal oficial de membros da LAJE no CIn/UFPE. Acesse procedimentos internos, regras, formulários de requisições e canais oficiais de comunicação.'
};

export default function MembrosPage() {
  return (
    <PageContainer className="flex flex-col gap-10">
      <MembersHub />
    </PageContainer>
  );
}
