import { useState, useEffect, useRef } from 'react';

const COLORS = {
  bg: '#0a0a0f',
  s1: '#12121a',
  s2: '#1a1a26',
  bd: '#2a2a3e',
  green: '#00e5a0',
  gdim: '#00e5a018',
  gglow: '#00e5a035',
  text: '#e8e8f0',
  muted: '#6b6b8a',
  danger: '#ff4d6d',
  warn: '#ffb347',
  purple: '#a78bfa',
};

const SEGMENTOS = [
  { emoji: '💅', nome: 'Unhas' },
  { emoji: '✨', nome: 'Estética' },
  { emoji: '💇', nome: 'Salões' },
  { emoji: '🪷', nome: 'Depilação' },
  { emoji: '✂️', nome: 'Barbearias' },
  { emoji: '🎨', nome: 'Tatuagem' },
  { emoji: '🏋️', nome: 'Personal' },
  { emoji: '🥗', nome: 'Nutrição' },
  { emoji: '🧠', nome: 'Psicologia' },
  { emoji: '🦷', nome: 'Dentistas' },
  { emoji: '🏠', nome: 'Arquitetura' },
  { emoji: '⚖️', nome: 'Advocacia' },
];

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: COLORS.bg,
    backgroundImage: `
      linear-gradient(rgba(42, 42, 62, 0.15) 1px, transparent 1px),
      linear-gradient(90deg, rgba(42, 42, 62, 0.15) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
    color: COLORS.text,
    fontFamily: 'system-ui, sans-serif',
    padding: '20px',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    padding: '15px 20px',
    backgroundColor: COLORS.s1,
    borderRadius: '16px',
    border: `1px solid ${COLORS.bd}`,
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: COLORS.green,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  btnSair: {
    backgroundColor: 'transparent',
    border: `1px solid ${COLORS.danger}`,
    color: COLORS.danger,
    padding: '8px 16px',
    borderRadius: '11px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  tab: {
    flex: 1,
    padding: '14px',
    backgroundColor: COLORS.s1,
    border: `1px solid ${COLORS.bd}`,
    borderRadius: '16px',
    color: COLORS.muted,
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s',
  },
  tabActive: {
    backgroundColor: COLORS.s2,
    borderColor: COLORS.green,
    color: COLORS.green,
    boxShadow: COLORS.gglow,
  },
  badge: {
    backgroundColor: COLORS.green,
    color: COLORS.bg,
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: COLORS.s1,
    borderRadius: '16px',
    padding: '18px',
    border: `1px solid ${COLORS.bd}`,
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: COLORS.s2,
    border: `1px solid ${COLORS.bd}`,
    borderRadius: '10px',
    color: COLORS.text,
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '12px 14px',
    backgroundColor: COLORS.s2,
    border: `1px solid ${COLORS.bd}`,
    borderRadius: '10px',
    color: COLORS.text,
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    minHeight: '150px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  btn: {
    padding: '12px 20px',
    borderRadius: '11px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  btnPrimary: {
    backgroundColor: COLORS.green,
    color: COLORS.bg,
  },
  btnPurple: {
    backgroundColor: COLORS.purple,
    color: '#fff',
  },
  btnDanger: {
    backgroundColor: COLORS.danger,
    color: '#fff',
  },
  btnSecondary: {
    backgroundColor: COLORS.s2,
    color: COLORS.text,
    border: `1px solid ${COLORS.bd}`,
  },
  btnGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginTop: '10px',
  },
  leadItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px',
    backgroundColor: COLORS.s2,
    borderRadius: '10px',
    marginBottom: '8px',
  },
  leadNumber: {
    width: '22px',
    height: '22px',
    backgroundColor: COLORS.green,
    color: COLORS.bg,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  leadInfo: {
    flex: 1,
  },
  leadName: {
    fontWeight: '600',
    fontSize: '14px',
  },
  leadPhone: {
    color: COLORS.muted,
    fontSize: '13px',
  },
  leadActions: {
    display: 'flex',
    gap: '6px',
  },
  iconBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '4px',
    borderRadius: '4px',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  chip: {
    padding: '8px 14px',
    backgroundColor: COLORS.s2,
    border: `1px solid ${COLORS.bd}`,
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '13px',
    transition: 'all 0.2s',
  },
  chipActive: {
    backgroundColor: COLORS.purple,
    borderColor: COLORS.purple,
    color: '#fff',
  },
  slider: {
    width: '100%',
    marginTop: '8px',
  },
  sliderLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: COLORS.muted,
    marginBottom: '8px',
  },
  preview: {
    backgroundColor: '#005c4b',
    padding: '12px 16px',
    borderRadius: '12px',
    borderBottomRightRadius: '2px',
    maxWidth: '85%',
    marginLeft: 'auto',
    fontSize: '14px',
    lineHeight: '1.4',
  },
  logConsole: {
    backgroundColor: '#050508',
    fontFamily: 'monospace',
    fontSize: '12px',
    padding: '12px',
    borderRadius: '10px',
    height: '140px',
    overflowY: 'auto',
    marginTop: '12px',
    color: COLORS.green,
  },
  progressBar: {
    height: '4px',
    backgroundColor: COLORS.s2,
    borderRadius: '2px',
    marginTop: '12px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.green,
    transition: 'width 0.3s ease',
  },
  loginScreen: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  loginBox: {
    backgroundColor: COLORS.s1,
    borderRadius: '16px',
    padding: '30px',
    border: `1px solid ${COLORS.bd}`,
    width: '100%',
    maxWidth: '400px',
  },
  loginTitle: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: 'bold',
    color: COLORS.green,
    marginBottom: '24px',
  },
  toggle: {
    display: 'flex',
    marginBottom: '24px',
    gap: '10px',
  },
  toggleBtn: {
    flex: 1,
    padding: '10px',
    borderRadius: '10px',
    border: `1px solid ${COLORS.bd}`,
    backgroundColor: 'transparent',
    color: COLORS.muted,
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
  toggleBtnActive: {
    backgroundColor: COLORS.green,
    color: COLORS.bg,
    borderColor: COLORS.green,
  },
  formGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    color: COLORS.muted,
    marginBottom: '6px',
  },
  fullBtn: {
    width: '100%',
    padding: '18px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  historyItem: {
    backgroundColor: COLORS.s2,
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '12px',
  },
  historyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  historyBadge: {
    backgroundColor: COLORS.green,
    color: COLORS.bg,
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  historyDate: {
    color: COLORS.muted,
    fontSize: '12px',
  },
  historyPreview: {
    fontSize: '13px',
    color: COLORS.muted,
    maxHeight: '70px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  historyMeta: {
    display: 'flex',
    gap: '16px',
    marginTop: '10px',
    fontSize: '12px',
    color: COLORS.muted,
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: COLORS.muted,
  },
  editInput: {
    padding: '6px 10px',
    backgroundColor: COLORS.s1,
    border: `1px solid ${COLORS.green}`,
    borderRadius: '6px',
    color: COLORS.text,
    fontSize: '13px',
    width: '120px',
  },
  statsRow: {
    display: 'flex',
    gap: '20px',
    marginBottom: '12px',
    fontSize: '13px',
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  statLabel: {
    color: COLORS.muted,
  },
  statValue: {
    color: COLORS.green,
    fontWeight: 'bold',
  },
};

export default function AutoMsgPro() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loginForm, setLoginForm] = useState({ nome: '', email: '', senha: '' });
  const [activeTab, setActiveTab] = useState('coletor');
  
  const [rawText, setRawText] = useState('');
  const [leads, setLeads] = useState([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [editValues, setEditValues] = useState({ nome: '', telefone: '' });

  const [negocio, setNegocio] = useState({ nome: '', segmento: '', descricao: '' });
  const [segmentoSelecionado, setSegmentoSelecionado] = useState(null);
  const [publicoPersonalizado, setPublicoPersonalizado] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [msgPorDia, setMsgPorDia] = useState(30);
  const [pausa, setPausa] = useState(60);
  const [leadsDisparador, setLeadsDisparador] = useState([]);
  const [leadsCSV, setLeadsCSV] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [sentCount, setSentCount] = useState(0);
  const [currentLeadIndex, setCurrentLeadIndex] = useState(-1);
  const logRef = useRef(null);

  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('automsg_user');
    const savedLeads = localStorage.getItem('automsg_leads');
    const savedHistorico = localStorage.getItem('automsg_historico');
    const savedLeadsCSV = localStorage.getItem('automsg_leads_csv');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedLeads) setLeads(JSON.parse(savedLeads));
    if (savedHistorico) setHistorico(JSON.parse(savedHistorico));
    if (savedLeadsCSV) setLeadsCSV(JSON.parse(savedLeadsCSV));
  }, []);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString('pt-BR');
    setLogs(prev => [...prev, `[${time}] ${msg}`]);
  };

  const handleLogin = () => {
    if (!loginForm.email || !loginForm.senha) {
      alert('Preencha email e senha');
      return;
    }
    if (!isLogin && !loginForm.nome) {
      alert('Preencha seu nome');
      return;
    }
    const userData = {
      nome: loginForm.nome || loginForm.email.split('@')[0],
      email: loginForm.email,
    };
    localStorage.setItem('automsg_user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('automsg_user');
    setUser(null);
    setActiveTab('coletor');
  };

  const extractWithAI = async () => {
    if (!rawText.trim()) {
      alert('Cole um texto para extrair');
      return;
    }
    setIsExtracting(true);
    addLog('Iniciando extração com IA (via API)...');
    
    // === MODO MANUAL SEM IA (GRATUITO) ===
    const extractManually = () => {
      const text = rawText;
      const lines = text.split('\n');
      const leads = [];
      const usedPhones = new Set();
      
      // Regex para telefone brasileiro (mais abrangente)
      const phoneRegex = /(?:(?:\+|00)?55|0)?(?:\(?\d{2}\)?[\s.\-]?)?\d{4,5}[\s.\-]?\d{4}/g;
      // Regex para Instagram
      const instaRegex = /(?:instagram\.com\/|@)([a-zA-Z0-9._]+)/i;
      
      // Procurar todas as linhas que contêm telefone
      const linesWithPhone = [];
      lines.forEach((line, idx) => {
        const phoneMatch = line.match(phoneRegex);
        if (phoneMatch) {
          let phone = phoneMatch[0].replace(/\D/g, '');
          // Aceita telefone com 10+ dígitos
          if (phone.length >= 10) {
            if (!phone.startsWith('55') && !phone.startsWith('0')) {
              phone = '55' + phone.replace(/^0+/, '');
            } else if (phone.startsWith('0')) {
              phone = '55' + phone.substring(1);
            }
            linesWithPhone.push({
              lineIdx: idx,
              line: line.trim(),
              phone: phone
            });
          }
        }
      });
      
      // Para cada telefone encontrado, procurar nome e instagram
      linesWithPhone.forEach((item, idx) => {
        if (usedPhones.has(item.phone)) return;
        usedPhones.add(item.phone);
        
        let nome = '';
        let instagram = '';
        
        // Procurar nome: linhas próximas que não têm números longos
        for (let i = Math.max(0, item.lineIdx - 3); i <= Math.min(lines.length - 1, item.lineIdx + 2); i++) {
          const line = lines[i].trim();
          
          // Detectar Instagram
          const instaMatch = line.match(instaRegex);
          if (instaMatch && !instagram) {
            instagram = '@' + instaMatch[1].replace('@', '');
            continue;
          }
          
          // Se a linha não tem telefone mas parece nome (letras, sem números longos)
          if (i !== item.lineIdx && line.length > 2 && line.length < 60) {
            const hasLongNumber = line.match(/\d{6,}/);
            const hasAt = line.includes('@');
            const hasHttp = line.toLowerCase().includes('http');
            
            if (!hasLongNumber && !hasAt && !hasHttp) {
              // Parece ser nome
              const cleanName = line.replace(/[^\w\sÀ-ÿ&\-.,]/g, '').trim();
              if (cleanName.length > 2 && !nome) {
                nome = cleanName;
              }
            }
          }
        }
        
        leads.push({
          nome: nome || `Lead ${leads.length + 1}`,
          telefone: item.phone,
          instagram: instagram
        });
      });
      
      return leads;
    };
    
    const extracted = extractManually();
    
    if (extracted.length > 0) {
      setLeads(extracted);
      localStorage.setItem('automsg_leads', JSON.stringify(extracted));
      addLog(`Extração concluída: ${extracted.length} leads encontrados (modo manual)`);
      setIsExtracting(false);
      return;
    }
    
    // Se manual não encontrou, tenta IA
    addLog('Modo manual não encontrou telefones. Tentando IA...');
    
    try {
      const prompt = `Extraia todos os negócios/empresas do texto abaixo. Para cada um, identifique o nome e o telefone. Se não tiver telefone, escreva "sem telefone". Retorne APENAS um array JSON válido com objetos: [{"nome":"...","telefone":"..."}]. Texto: ${rawText}`;
      
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      if (!res.ok) {
        throw new Error(`Erro da API: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      let text = data.text || '';
      
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      if (!text.startsWith('[')) {
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          text = jsonMatch[0];
        }
      }
      
      const extracted = JSON.parse(text);
      
      const seen = new Set();
      const unique = extracted.filter(lead => {
        const phone = lead.telefone?.toString().replace(/\D/g, '') || '';
        if (!phone || seen.has(phone)) return false;
        seen.add(phone);
        return true;
      });
      
      setLeads(unique);
      localStorage.setItem('automsg_leads', JSON.stringify(unique));
      addLog(`Extração concluída: ${unique.length} leads encontrados`);
    } catch (err) {
      addLog(`Erro na extração: ${err.message}`);
      alert('Erro ao processar: ' + err.message + '\nTente novamente em alguns segundos.');
    }
    setIsExtracting(false);
  };

  const removeLead = (index) => {
    const newLeads = leads.filter((_, i) => i !== index);
    setLeads(newLeads);
    localStorage.setItem('automsg_leads', JSON.stringify(newLeads));
  };

  const startEdit = (index, lead) => {
    setEditingLead(index);
    setEditValues({ nome: lead.nome, telefone: lead.telefone });
  };

  const saveEdit = (index) => {
    const newLeads = [...leads];
    newLeads[index] = { nome: editValues.nome, telefone: editValues.telefone };
    setLeads(newLeads);
    localStorage.setItem('automsg_leads', JSON.stringify(newLeads));
    setEditingLead(null);
  };

  const cancelEdit = () => {
    setEditingLead(null);
  };

  const downloadCSV = () => {
    if (leads.length === 0) {
      alert('Nenhum lead para baixar');
      return;
    }
    const csvContent = 'Nome,Telefone\n' + leads.map(l => `${l.nome},${l.telefone}`).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'leads.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const sendToDisparador = () => {
    if (leads.length === 0) {
      alert('Nenhum lead para enviar');
      return;
    }
    setLeadsDisparador([...leadsDisparador, ...leads]);
    setActiveTab('disparador');
    addLog(`${leads.length} leads enviados para o Disparador`);
  };

  const generateMessage = async () => {
    if (!negocio.nome || (!segmentoSelecionado && !publicoPersonalizado)) {
      alert('Preencha o nome do negócio e selecione um segmento ou público');
      return;
    }
    setIsGenerating(true);
    addLog('Gerando mensagem com IA...');
    
    try {
      const segmento = segmentoSelecionado || 'clientes';
      const prompt = `Crie uma mensagem de prospecção para WhatsApp direcionada a profissionais de ${segmento}. O negócio se chama "${negocio.nome}" e é do segmento "${negocio.segmento}". Descrição: ${negocio.descricao || 'não informada'}. A mensagem deve ter no máximo 200 palavras, em português brasileiro, com saudação amigável e chamada para ação clara (CTA). Formato: apenas a mensagem, sem explicações.`;
      
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await res.json();
      setMensagem(data.text || '');
      addLog('Mensagem gerada com sucesso');
    } catch (err) {
      addLog(`Erro ao gerar mensagem: ${err.message}`);
      alert('Erro ao gerar mensagem');
    }
    setIsGenerating(false);
  };

  const formatPhone = (phone) => {
    let nums = phone.toString().replace(/\D/g, '');
    if (nums.length < 12 && nums.length > 0) {
      nums = '55' + nums;
    }
    return nums;
  };

  const parseCSV = (text) => {
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length < 2) return [];
    
    const header = lines[0].toLowerCase();
    let phoneCol = -1;
    let nameCol = -1;
    
    const headers = header.split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''));
    
    headers.forEach((h, i) => {
      if (['telefone', 'phone', 'celular', 'whatsapp', 'numero', 'tel'].includes(h)) {
        phoneCol = i;
      }
      if (['nome', 'name', 'empresa', 'razão social', 'razao'].includes(h)) {
        nameCol = i;
      }
    });
    
    if (phoneCol === -1) return [];
    
    const result = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map(c => c.trim().replace(/"/g, ''));
      const phone = cols[phoneCol] || '';
      const name = nameCol >= 0 ? cols[nameCol] || `Lead ${i}` : `Lead ${i}`;
      if (phone) {
        result.push({ nome: name, telefone: phone });
      }
    }
    
    return result;
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const parsed = parseCSV(event.target.result);
      if (parsed.length === 0) {
        alert('CSV inválido ou sem coluna de telefone');
        return;
      }
      
      const seen = new Set();
      const unique = parsed.filter(lead => {
        const phone = formatPhone(lead.telefone);
        if (seen.has(phone)) return false;
        seen.add(phone);
        return true;
      });
      
      setLeadsCSV(unique);
      localStorage.setItem('automsg_leads_csv', JSON.stringify(unique));
      addLog(`${unique.length} leads carregados do CSV`);
    };
    reader.readAsText(file);
  };

  const clearLeadsColetor = () => {
    setLeads([]);
    localStorage.removeItem('automsg_leads');
    addLog('Leads do coletor removidos');
  };

  const allLeads = [...leadsDisparador, ...leadsCSV];
  const maxToSend = Math.min(msgPorDia, allLeads.length);

  const startCampaign = () => {
    if (allLeads.length === 0) {
      alert('Nenhum lead disponível');
      return;
    }
    if (!mensagem.trim()) {
      alert('Defina uma mensagem');
      return;
    }
    
    setIsRunning(true);
    setLogs([]);
    setProgress(0);
    setSentCount(0);
    setCurrentLeadIndex(0);
    addLog(`Iniciando campanha para ${allLeads.length} leads. Clique em "Próximo" para cada envio.`);
  };

  const sendNextMessage = async () => {
    if (currentLeadIndex >= maxToSend || !isRunning) {
      finishCampaign();
      return;
    }
    
    const lead = allLeads[currentLeadIndex];
    const phone = formatPhone(lead.telefone);
    const encodedMsg = encodeURIComponent(mensagem);
    
    if (phone.length >= 12) {
      window.open(`https://web.whatsapp.com/send?phone=${phone}&text=${encodedMsg}`, '_blank');
      addLog(`Enviado para ${lead.nome}: ${phone}`);
    } else {
      addLog(`Telefone inválido: ${lead.nome} (${lead.telefone})`);
    }
    
    const newCount = sentCount + 1;
    setSentCount(newCount);
    setProgress((newCount / maxToSend) * 100);
    setCurrentLeadIndex(currentLeadIndex + 1);
  };

  const finishCampaign = () => {
    setIsRunning(false);
    addLog(`Campanha concluída! ${sentCount} mensagens enviadas.`);
    
    const campaign = {
      negocio: negocio.nome,
      data: new Date().toISOString(),
      enviada: sentCount,
      mensagem: mensagem,
      segmento: segmentoSelecionado || '',
      pausa: pausa,
      totalLeads: allLeads.length,
    };
    
    const newHistorico = [campaign, ...historico];
    setHistorico(newHistorico);
    localStorage.setItem('automsg_historico', JSON.stringify(newHistorico));
  };

  const stopCampaign = () => {
    setIsRunning(false);
    addLog('Campanha interrompida pelo usuário');
  };

  const totalLeads = leadsDisparador.length + leadsCSV.length;

  if (!user) {
    return (
      <div style={styles.app}>
        <div style={styles.loginScreen}>
          <div style={styles.loginBox}>
            <div style={styles.loginTitle}>🚀 AutoMsg Pro</div>
            
            <div style={styles.toggle}>
              <button
                style={{...styles.toggleBtn, ...(isLogin ? styles.toggleBtnActive : {})}}
                onClick={() => setIsLogin(true)}
              >
                Entrar
              </button>
              <button
                style={{...styles.toggleBtn, ...(!isLogin ? styles.toggleBtnActive : {})}}
                onClick={() => setIsLogin(false)}
              >
                Criar conta
              </button>
            </div>
            
            {!isLogin && (
              <div style={styles.formGroup}>
                <label style={styles.label}>Nome completo</label>
                <input
                  type="text"
                  style={styles.input}
                  value={loginForm.nome}
                  onChange={(e) => setLoginForm({...loginForm, nome: e.target.value})}
                  placeholder="Seu nome"
                />
              </div>
            )}
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                style={styles.input}
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                placeholder="seu@email.com"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Senha</label>
              <input
                type="password"
                style={styles.input}
                value={loginForm.senha}
                onChange={(e) => setLoginForm({...loginForm, senha: e.target.value})}
                placeholder="••••••••"
              />
            </div>
            
            <button
              style={{...styles.btn, ...styles.btnPrimary, ...styles.fullBtn}}
              onClick={handleLogin}
            >
              {isLogin ? 'Entrar' : 'Criar conta'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.bd}; border-radius: 2px; }
        input:focus, textarea:focus { border-color: ${COLORS.green} !important; }
      `}</style>
      
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.logo}>
            🚀 AutoMsg Pro
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <span style={{color: COLORS.muted, fontSize: '14px'}}>{user.nome}</span>
            <button style={styles.btnSair} onClick={handleLogout}>Sair</button>
          </div>
        </div>
        
        <div style={styles.tabs}>
          <button
            style={{...styles.tab, ...(activeTab === 'coletor' ? styles.tabActive : {})}}
            onClick={() => setActiveTab('coletor')}
          >
            📋 Coletor {leads.length > 0 && <span style={styles.badge}>{leads.length}</span>}
          </button>
          <button
            style={{...styles.tab, ...(activeTab === 'disparador' ? styles.tabActive : {})}}
            onClick={() => setActiveTab('disparador')}
          >
            📤 Disparador {totalLeads > 0 && <span style={styles.badge}>{totalLeads}</span>}
          </button>
          <button
            style={{...styles.tab, ...(activeTab === 'historico' ? styles.tabActive : {})}}
            onClick={() => setActiveTab('historico')}
          >
            📊 Histórico
          </button>
        </div>
        
        {activeTab === 'coletor' && (
          <div>
            <div style={styles.card}>
              <div style={styles.cardTitle}>📥 Colar dados do Google Maps</div>
              <textarea
                style={{...styles.textarea, minHeight: '180px'}}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Cole aqui o texto copiado do Google Maps (resultados de busca, avaliações, etc.)"
              />
              <div style={styles.btnGroup}>
                <button
                  style={{...styles.btn, ...styles.btnSecondary}}
                  onClick={() => window.open('https://www.google.com/maps', '_blank')}
                >
                  🗺 Abrir Maps
                </button>
                <button
                  style={{...styles.btn, ...styles.btnPrimary}}
                  onClick={extractWithAI}
                  disabled={isExtracting}
                >
                  {isExtracting ? '⏳ Extraindo...' : '⚡ Extrair (Grátis)'}
                </button>
                <button
                  style={{...styles.btn, ...styles.btnPurple}}
                  onClick={extractWithAI}
                  disabled={isExtracting}
                >
                  {isExtracting ? '⏳...' : '✨ IA'}
                </button>
              </div>
            </div>
            
            {leads.length > 0 && (
              <div style={styles.card}>
                <div style={styles.cardTitle}>📊 Leads extraídos ({leads.length})</div>
                {leads.map((lead, idx) => (
                  <div key={idx} style={styles.leadItem}>
                    <div style={styles.leadNumber}>{idx + 1}</div>
                    <div style={styles.leadInfo}>
                      {editingLead === idx ? (
                        <div style={{display: 'flex', gap: '8px'}}>
                          <input
                            style={styles.editInput}
                            value={editValues.nome}
                            onChange={(e) => setEditValues({...editValues, nome: e.target.value})}
                          />
                          <input
                            style={styles.editInput}
                            value={editValues.telefone}
                            onChange={(e) => setEditValues({...editValues, telefone: e.target.value})}
                          />
                          <button style={{...styles.btn, ...styles.btnPrimary, padding: '6px 12px', fontSize: '12px'}} onClick={() => saveEdit(idx)}>✓</button>
                          <button style={{...styles.btn, ...styles.btnSecondary, padding: '6px 12px', fontSize: '12px'}} onClick={cancelEdit}>✕</button>
                        </div>
                      ) : (
                        <>
                          <div style={styles.leadName}>{lead.nome}</div>
                          <div style={styles.leadPhone}>{lead.telefone}</div>
                          {lead.instagram && <div style={{...styles.leadPhone, color: COLORS.purple}}>📸 {lead.instagram}</div>}
                        </>
                      )}
                    </div>
                    {editingLead !== idx && (
                      <div style={styles.leadActions}>
                        <button style={styles.iconBtn} onClick={() => startEdit(idx, lead)}>✏️</button>
                        <button style={{...styles.iconBtn, color: COLORS.danger}} onClick={() => removeLead(idx)}>✕</button>
                      </div>
                    )}
                  </div>
                ))}
                <div style={styles.btnGroup}>
                  <button style={{...styles.btn, ...styles.btnSecondary}} onClick={downloadCSV}>
                    ⬇ Baixar CSV
                  </button>
                  <button style={{...styles.btn, ...styles.btnPrimary}} onClick={sendToDisparador}>
                    ✅ Usar no Disparador →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'disparador' && (
          <div>
            <div style={styles.card}>
              <div style={styles.cardTitle}>🏪 Seu Negócio</div>
              <div style={{marginBottom: '12px'}}>
                <label style={styles.label}>Nome do negócio</label>
                <input
                  style={styles.input}
                  value={negocio.nome}
                  onChange={(e) => setNegocio({...negocio, nome: e.target.value})}
                  placeholder="Ex: Studio Beleza"
                />
              </div>
              <div style={{marginBottom: '12px'}}>
                <label style={styles.label}>Segmento</label>
                <input
                  style={styles.input}
                  value={negocio.segmento}
                  onChange={(e) => setNegocio({...negocio, segmento: e.target.value})}
                  placeholder="Ex: Salão de beleza"
                />
              </div>
              <div>
                <label style={styles.label}>Descrição</label>
                <textarea
                  style={{...styles.textarea, minHeight: '80px'}}
                  value={negocio.descricao}
                  onChange={(e) => setNegocio({...negocio, descricao: e.target.value})}
                  placeholder="Descreva seu negócio..."
                />
              </div>
            </div>
            
            <div style={styles.card}>
              <div style={styles.cardTitle}>👥 Público Alvo</div>
              <div style={styles.chips}>
                {SEGMENTOS.map((seg) => (
                  <button
                    key={seg.nome}
                    style={{
                      ...styles.chip,
                      ...(segmentoSelecionado === seg.nome ? styles.chipActive : {}),
                    }}
                    onClick={() => {
                      setSegmentoSelecionado(seg.nome);
                      setPublicoPersonalizado('');
                    }}
                  >
                    {seg.emoji} {seg.nome}
                  </button>
                ))}
              </div>
              <div style={{marginTop: '12px'}}>
                <label style={styles.label}>Público personalizado</label>
                <input
                  style={styles.input}
                  value={publicoPersonalizado}
                  onChange={(e) => {
                    setPublicoPersonalizado(e.target.value);
                    setSegmentoSelecionado(null);
                  }}
                  placeholder="Digite outro segmento..."
                />
              </div>
            </div>
            
            <div style={styles.card}>
              <div style={styles.cardTitle}>💬 Mensagem</div>
              <button
                style={{...styles.btn, ...styles.btnPurple, marginBottom: '12px'}}
                onClick={generateMessage}
                disabled={isGenerating}
              >
                {isGenerating ? '⏳ Gerando...' : '✨ Gerar mensagem com IA'}
              </button>
              <textarea
                style={{...styles.textarea, minHeight: '120px'}}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Escreva ou gere sua mensagem de prospecção..."
              />
              {mensagem && (
                <div style={{marginTop: '16px'}}>
                  <div style={{color: COLORS.muted, fontSize: '12px', marginBottom: '8px'}}>Preview WhatsApp:</div>
                  <div style={styles.preview}>{mensagem}</div>
                </div>
              )}
            </div>
            
            <div style={styles.card}>
              <div style={styles.cardTitle}>⚙️ Configurações</div>
              <div style={styles.statsRow}>
                <div style={styles.statItem}>
                  <span style={styles.statLabel}>Do Coletor:</span>
                  <span style={styles.statValue}>{leadsDisparador.length}</span>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statLabel}>Do CSV:</span>
                  <span style={styles.statValue}>{leadsCSV.length}</span>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statLabel}>Total:</span>
                  <span style={styles.statValue}>{totalLeads}</span>
                </div>
              </div>
              
              <div style={{marginBottom: '16px'}}>
                <div style={styles.sliderLabel}>
                  <span>Mensagens por dia</span>
                  <span>{msgPorDia}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={msgPorDia}
                  onChange={(e) => setMsgPorDia(parseInt(e.target.value))}
                  style={styles.slider}
                />
              </div>
              
              <div style={{marginBottom: '16px'}}>
                <div style={styles.sliderLabel}>
                  <span>Pausa entre mensagens (segundos)</span>
                  <span>{pausa}s</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="180"
                  value={pausa}
                  onChange={(e) => setPausa(parseInt(e.target.value))}
                  style={styles.slider}
                />
              </div>
              
              <div style={{display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap'}}>
                <label style={{...styles.btn, ...styles.btnSecondary, display: 'inline-block', cursor: 'pointer', position: 'relative'}}>
                  📤 Importar CSV
                  <input type="file" accept=".csv" onChange={handleCSVUpload} style={{position: 'absolute', opacity: 0, top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer'}} />
                </label>
                <button style={{...styles.btn, ...styles.btnSecondary}} onClick={clearLeadsColetor}>
                  🗑 Limpar Coletor
                </button>
              </div>
              
              {leadsDisparador.length > 0 && (
                <button
                  style={{...styles.btn, ...styles.btnSecondary, marginTop: '10px', fontSize: '12px'}}
                  onClick={() => { setLeadsDisparador([]); }}
                >
                  🗑 Limpar leads do Disparador
                </button>
              )}
            </div>
            
            <div style={styles.card}>
              {isRunning && (
                <>
                  <div style={styles.progressBar}>
                    <div style={{...styles.progressFill, width: `${progress}%`}} />
                  </div>
                  <div style={{fontSize: '13px', color: COLORS.muted, marginTop: '8px', textAlign: 'center'}}>
                    {sentCount} / {Math.min(msgPorDia, totalLeads)} mensagens enviadas
                  </div>
                </>
              )}
              
              <div style={styles.logConsole} ref={logRef}>
                {logs.length === 0 ? 'Aguardando início...' : logs.map((log, i) => <div key={i}>{log}</div>)}
              </div>
              
              <div style={{marginTop: '12px', display: 'flex', gap: '10px'}}>
                {!isRunning ? (
                  <button
                    style={{...styles.btn, ...styles.btnPrimary, ...styles.fullBtn}}
                    onClick={startCampaign}
                    disabled={totalLeads === 0 || !mensagem.trim()}
                  >
                    ▶ Iniciar Campanha
                  </button>
                ) : (
                  <>
                    <button
                      style={{...styles.btn, ...styles.btnPurple, ...styles.fullBtn, flex: 1}}
                      onClick={sendNextMessage}
                      disabled={currentLeadIndex >= maxToSend}
                    >
                      {currentLeadIndex >= maxToSend ? '✓ Finalizar' : `📤 Próximo (${currentLeadIndex + 1}/${maxToSend})`}
                    </button>
                    <button
                      style={{...styles.btn, ...styles.btnDanger, padding: '18px'}}
                      onClick={() => { setIsRunning(false); addLog('Campanha interrompida'); }}
                    >
                      ⏹
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'historico' && (
          <div>
            {historico.length === 0 ? (
              <div style={styles.card}>
                <div style={styles.emptyState}>
                  <div style={{fontSize: '48px', marginBottom: '16px'}}>📭</div>
                  <div>Nenhuma campanha ainda.</div>
                  <div style={{fontSize: '13px', marginTop: '8px'}}>Suas campanhas aparecerão aqui.</div>
                </div>
              </div>
            ) : (
              historico.map((camp, idx) => (
                <div key={idx} style={styles.card}>
                  <div style={styles.historyHeader}>
                    <div style={{fontWeight: 'bold', fontSize: '16px'}}>{camp.negocio || 'Sem nome'}</div>
                    <span style={styles.historyBadge}>✅ {camp.enviados}</span>
                  </div>
                  <div style={styles.historyDate}>
                    {new Date(camp.data).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <div style={styles.historyPreview}>{camp.mensagem}</div>
                  <div style={styles.historyMeta}>
                    <span>🎯 {camp.segmento || 'Geral'}</span>
                    <span>⏱ {camp.pausa}s</span>
                    <span>📋 {camp.totalLeads} leads</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}