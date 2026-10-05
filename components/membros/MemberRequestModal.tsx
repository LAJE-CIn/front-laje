'use client';

import { useState, useEffect, type FormEvent } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Clock,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { FORMS_DATA, type FormItem } from './membrosData';

interface MemberRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFormId?: string;
}

export default function MemberRequestModal({
  isOpen,
  onClose,
  initialFormId
}: MemberRequestModalProps) {
  const [selectedFormId, setSelectedFormId] = useState<string>(
    initialFormId || FORMS_DATA[0].id
  );

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [curso, setCurso] = useState('Ciência da Computação');
  const [squad, setSquad] = useState('');
  const [details, setDetails] = useState('');
  const [attachmentLink, setAttachmentLink] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [protocolCode, setProtocolCode] = useState('');
  const [copiedProtocol, setCopiedProtocol] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sincronizar form selecionado quando abrir
  useEffect(() => {
    if (initialFormId) {
      setSelectedFormId(initialFormId);
    }
  }, [initialFormId, isOpen]);

  // Bloquear rolagem do body quando o modal estiver aberto e escutar tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      // Resetar form após fechar
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsSubmitting(false);
        setErrorMessage('');
      }, 200);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const activeForm: FormItem =
    FORMS_DATA.find((f) => f.id === selectedFormId) || FORMS_DATA[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !matricula.trim() || !details.trim()) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios (*).');
      return;
    }

    if (!email.includes('@')) {
      setErrorMessage('Por favor, informe um endereço de e-mail válido (@cin ou @ufpe preferencialmente).');
      return;
    }

    setIsSubmitting(true);

    // Simular envio para o backend com SLA e geração de protocolo
    setTimeout(() => {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const generatedProtocol = `LAJE-${activeForm.category.toUpperCase().slice(0, 3)}-2026-${randomSuffix}`;
      setProtocolCode(generatedProtocol);
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 800);
  };

  const handleCopyProtocol = () => {
    navigator.clipboard.writeText(protocolCode);
    setCopiedProtocol(true);
    setTimeout(() => setCopiedProtocol(false), 2500);
  };

  const handleResetForm = () => {
    setSubmitSuccess(false);
    setFullName('');
    setEmail('');
    setMatricula('');
    setSquad('');
    setDetails('');
    setAttachmentLink('');
    setErrorMessage('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Container do Modal */}
      <div className="relative w-full max-w-2xl bg-gray-950 border-2 border-green-500/50 rounded-2xl shadow-[0_0_40px_rgba(34,197,94,0.2)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header do Modal */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-green-500/30 bg-gray-900/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-green-500/10 text-green-400 border border-green-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono tracking-widest text-green-400 uppercase font-semibold">
                Central de Requerimentos LAJE
              </span>
              <h3 id="modal-title" className="text-lg font-bold text-white leading-tight">
                {submitSuccess ? 'Solicitação Registrada' : 'Formulário de Solicitação'}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label="Fechar janela de solicitação"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo do Modal (Scrollável) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-gray-200">
          {!submitSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Seletor de Tipo de Solicitação */}
              <div className="space-y-2">
                <label
                  htmlFor="form-type-select"
                  className="block text-xs font-mono font-bold tracking-wide text-green-300 uppercase"
                >
                  Tipo de Requerimento *
                </label>
                <select
                  id="form-type-select"
                  value={selectedFormId}
                  onChange={(e) => setSelectedFormId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-900 border border-green-500/40 rounded-xl text-white font-sans text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                >
                  {FORMS_DATA.map((form) => (
                    <option key={form.id} value={form.id} className="bg-gray-900 text-white">
                      [{form.category.toUpperCase()}] {form.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Card Informativo do Requerimento Ativo */}
              <div className="p-3.5 rounded-xl bg-gray-900/60 border border-green-500/20 text-xs font-sans space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-white">{activeForm.purpose}</span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-green-500/20 text-green-300 font-mono text-[11px] border border-green-500/30">
                    <Clock className="w-3.5 h-3.5 text-green-400" />
                    <span>SLA: {activeForm.sla}</span>
                  </div>
                </div>
                <p className="text-gray-400">
                  <strong className="text-green-300">Público-alvo:</strong> {activeForm.targetAudience}
                </p>
                <p className="text-gray-400">
                  <strong className="text-green-300">Dica:</strong> {activeForm.tips}
                </p>
              </div>

              {/* Mensagem de Erro se houver */}
              {errorMessage && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs font-sans">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Dados do Solicitante */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="full-name"
                    className="block text-xs font-mono font-medium text-gray-300"
                  >
                    Nome Completo *
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: Clara Albuquerque"
                    className="w-full px-3 py-2 bg-gray-900/80 border border-gray-700 rounded-xl text-white text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="institutional-email"
                    className="block text-xs font-mono font-medium text-gray-300"
                  >
                    E-mail Institucional *
                  </label>
                  <input
                    id="institutional-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@cin.ufpe.br"
                    className="w-full px-3 py-2 bg-gray-900/80 border border-gray-700 rounded-xl text-white text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="matricula"
                    className="block text-xs font-mono font-medium text-gray-300"
                  >
                    Matrícula / ID UFPE *
                  </label>
                  <input
                    id="matricula"
                    type="text"
                    required
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    placeholder="Ex: 2024.1.XXXX"
                    className="w-full px-3 py-2 bg-gray-900/80 border border-gray-700 rounded-xl text-white text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="curso"
                    className="block text-xs font-mono font-medium text-gray-300"
                  >
                    Curso de Graduação *
                  </label>
                  <select
                    id="curso"
                    value={curso}
                    onChange={(e) => setCurso(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900/80 border border-gray-700 rounded-xl text-white text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
                  >
                    <option value="Ciência da Computação">Ciência da Computação (CIn)</option>
                    <option value="Sistemas de Informação">Sistemas de Informação (CIn)</option>
                    <option value="Engenharia da Computação">Engenharia da Computação (CIn / Poli)</option>
                    <option value="Design">Design (CAC / UFPE)</option>
                    <option value="Música / Artes">Música / Artes Visuais (CAC)</option>
                    <option value="Outro Curso UFPE">Outro Curso UFPE</option>
                  </select>
                </div>
              </div>

              {/* Squad / Projeto */}
              <div className="space-y-1.5">
                <label
                  htmlFor="squad-name"
                  className="block text-xs font-mono font-medium text-gray-300"
                >
                  Squad / Projeto Atual na LAJE (Opcional)
                </label>
                <input
                  id="squad-name"
                  type="text"
                  value={squad}
                  onChange={(e) => setSquad(e.target.value)}
                  placeholder="Ex: Projeto Echoes, Squad Godot 2D, Projeto IP, ou 'Não alocado'"
                  className="w-full px-3 py-2 bg-gray-900/80 border border-gray-700 rounded-xl text-white text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
                />
              </div>

              {/* Detalhes / Justificativa */}
              <div className="space-y-1.5">
                <label
                  htmlFor="details-field"
                  className="block text-xs font-mono font-medium text-gray-300"
                >
                  Descrição / Justificativa da Solicitação *
                </label>
                <textarea
                  id="details-field"
                  rows={4}
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Descreva com clareza o que necessita, datas importantes, justificativa técnica/acadêmica e os detalhes da sua demanda..."
                  className="w-full px-3 py-2 bg-gray-900/80 border border-gray-700 rounded-xl text-white text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 resize-y"
                />
              </div>

              {/* Link de Anexo (Drive, itch, GitHub, etc) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="attachment-link"
                  className="block text-xs font-mono font-medium text-gray-300"
                >
                  Link de Anexo / Repositório / Documento (Opcional)
                </label>
                <input
                  id="attachment-link"
                  type="url"
                  value={attachmentLink}
                  onChange={(e) => setAttachmentLink(e.target.value)}
                  placeholder="https://drive.google.com/... ou https://github.com/..."
                  className="w-full px-3 py-2 bg-gray-900/80 border border-gray-700 rounded-xl text-white text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
                />
              </div>

              {/* Botões de Ação */}
              <div className="pt-2 flex flex-col-reverse sm:flex-row justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 font-sans text-sm font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-black font-mono font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Registrando Protocolo...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enviar Solicitação</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Tela de Confirmação e Sucesso */
            <div className="py-4 space-y-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 border-2 border-green-400 text-green-400 flex items-center justify-center shadow-[0_0_25px_rgba(34,197,94,0.3)]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  Solicitação Registrada com Sucesso!
                </h4>
                <p className="text-gray-300 text-sm max-w-md mx-auto">
                  Sua requisição foi encaminhada à diretoria da{' '}
                  <strong className="text-green-300">LAJE</strong> e aos orientadores do CIn/UFPE.
                </p>
              </div>

              {/* Card com Código de Protocolo */}
              <div className="max-w-md mx-auto p-4 rounded-xl bg-gray-900 border-2 border-green-500/40 space-y-3">
                <span className="text-xs font-mono tracking-widest text-green-400 uppercase">
                  Código de Rastreamento
                </span>
                <div className="flex items-center justify-between bg-black/70 px-4 py-2.5 rounded-lg border border-gray-800">
                  <span className="font-mono text-base font-bold text-green-300 tracking-wider">
                    {protocolCode}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyProtocol}
                    className="p-1.5 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                    title="Copiar código"
                  >
                    {copiedProtocol ? (
                      <span className="text-xs text-green-400 font-mono font-bold">Copiado!</span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-sans">
                  <Clock className="w-3.5 h-3.5 text-green-400" />
                  <span>Prazo estimado de resposta: {activeForm.sla}</span>
                </div>
              </div>

              {/* Informações de Acompanhamento */}
              <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 text-left text-xs font-sans space-y-2 max-w-md mx-auto">
                <div className="flex items-center gap-2 text-green-400 font-bold font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Próximos Passos</span>
                </div>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  <li>Uma notificação de confirmação foi despachada para {email}.</li>
                  <li>Dúvidas urgentes podem ser direcionadas ao canal de suporte no Discord da liga.</li>
                  <li>Declarações assinadas serão disponibilizadas no seu e-mail institucional.</li>
                </ul>
              </div>

              {/* Botões Finais */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-4 py-2 rounded-xl border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 text-xs font-mono font-semibold transition-colors"
                >
                  Nova Solicitação
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 rounded-xl bg-green-500 hover:bg-green-400 text-black text-xs font-mono font-bold tracking-wide transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                >
                  Concluir & Fechar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
