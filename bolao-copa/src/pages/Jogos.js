import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

// Dicionário de bandeiras
const getBandeira = (nome) => {
  if (!nome) return '🏳️';
  const nomeFormatado = nome.trim().toUpperCase();
  const bandeiras = {
    'BRASIL': '🇧🇷', 'ARGENTINA': '🇦🇷', 'FRANÇA': '🇫🇷', 'ALEMANHA': '🇩🇪',
    'INGLATERRA': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'ESPANHA': '🇪🇸', 'PORTUGAL': '🇵🇹', 'HOLANDA': '🇳🇱',
    'ITÁLIA': '🇮🇹', 'URUGUAI': '🇺🇾', 'BÉLGICA': '🇧🇪', 'CROÁCIA': '🇭🇷',
    'MARROCOS': '🇲🇦', 'ESTADOS UNIDOS': '🇺🇸', 'MÉXICO': '🇲🇽', 'COLÔMBIA': '🇨🇴',
    'JAPÃO': '🇯🇵', 'SENEGAL': '🇸🇳', 'COREIA DO SUL': '🇰🇷', 'AUSTRÁLIA': '🇦🇺',
    'CANADÁ': '🇨🇦', 'SUÍÇA': '🇨🇭', 'CAMARÕES': '🇨🇲', 'SÉRVIA': '🇷🇸',
    'GANA': '🇬🇭', 'POLÔNIA': '🇵🇱', 'EQUADOR': '🇪🇨', 'ARÁBIA SAUDITA': '🇸🇦',
    'CATAR': '🇶🇦', 'PAÍS DE GALES': '🏴󠁧󠁢󠁷󠁬󠁳󠁿', 'COSTA RICA': '🇨🇷', 'TUNÍSIA': '🇹🇳',
    'IRÃ': '🇮🇷', 'DINAMARCA': '🇩🇰', 'CHILE': '🇨🇱', 'PERU': '🇵🇪', 'PARAGUAI': '🇵🇾', 
    'VENEZUELA': '🇻🇪', 'BOLÍVIA': '🇧🇴', 'SUÉCIA': '🇸🇪', 'UCRÂNIA': '🇺🇦', 
    'NIGÉRIA': '🇳🇬', 'EGITO': '🇪🇬', 'ARGÉLIA': '🇩🇿', 'MALI': '🇲🇱', 
    'COSTA DO MARFIM': '🇨🇮', 'ÁFRICA DO SUL': '🇿🇦', 'PANAMÁ': '🇵🇦', 'JAMAICA': '🇯🇲', 
    'HONDURAS': '🇭🇳', 'EL SALVADOR': '🇸🇻', 'UZBEQUISTÃO': '🇺🇿', 'EMIRADOS ÁRABES': '🇦🇪', 
    'IRAQUE': '🇮🇶', 'OMÃ': '🇴🇲', 'CHINA': '🇨🇳', 'NOVA ZELÂNDIA': '🇳🇿', 
    'BÓSNIA': '🇧🇦', 'REPÚBLICA TCHECA': '🇨🇿', 'ESCÓCIA': '🏴󠁧󠁢󠁳󠁣󠁴󠁿'
  };
  return bandeiras[nomeFormatado] || '🏳️';
};

export default function Jogos() {
  const [jogos, setJogos] = useState([]);
  const [meusPalpites, setMeusPalpites] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });
  const [abaAtiva, setAbaAtiva] = useState('TODAS');
  const navigate = useNavigate();

  const nomesRodadas = {
    1: '1ª Rodada', 2: '2ª Rodada', 3: '3ª Rodada', 4: 'Fase de 32',
    5: 'Oitavas', 6: 'Quartas', 7: 'Semifinais', 8: 'Final'
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/');

    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const [resJogos, resPalpites] = await Promise.all([
        api.get('/jogos/'), api.get('/palpites/meus-palpites')
      ]);

      setJogos(resJogos.data);

      const palpitesMapeados = {};
      resPalpites.data.forEach(palpite => {
        palpitesMapeados[palpite.jogo_id] = {
          casa: palpite.gols_casa_palpite,
          fora: palpite.gols_fora_palpite
        };
      });
      setMeusPalpites(palpitesMapeados);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/');
      } else {
        mostrarMensagem('Erro ao carregar os dados.', 'erro');
      }
    } finally {
      setCarregando(false);
    }
  };

  const handlePalpiteChange = (jogoId, time, valor) => {
    if (valor !== '' && !/^\d+$/.test(valor)) return;
    setMeusPalpites(prev => ({
      ...prev,
      [jogoId]: {
        ...prev[jogoId],
        [time]: valor === '' ? '' : parseInt(valor, 10)
      }
    }));
  };

  const salvarPalpite = async (jogoId) => {
    const palpite = meusPalpites[jogoId];
    if (!palpite || palpite.casa === '' || palpite.fora === '' || palpite.casa === undefined || palpite.fora === undefined) {
      return mostrarMensagem('Preencha os dois placares.', 'erro');
    }

    try {
      await api.post('/palpites/', {
        jogo_id: jogoId,
        gols_casa_palpite: palpite.casa,
        gols_fora_palpite: palpite.fora
      });
      mostrarMensagem('Palpite registrado com sucesso! ✨', 'sucesso');
    } catch (error) {
      mostrarMensagem(error.response?.data?.detail || 'Erro ao salvar. Jogo bloqueado.', 'erro');
    }
  };

  const mostrarMensagem = (texto, tipo) => {
    setMensagem({ texto, tipo });
    setTimeout(() => setMensagem({ texto: '', tipo: '' }), 4000);
  };

  const fazerLogoff = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const rodadasUnicas = [...new Set(jogos.map((j) => j.rodada_id))].filter(Boolean).sort((a, b) => a - b);
  const jogosParaMostrar = abaAtiva === 'TODAS' ? jogos : jogos.filter(j => j.rodada_id === abaAtiva);

  const jogosAgrupados = {};
  jogosParaMostrar.forEach(jogo => {
    const rodada = jogo.rodada_id;
    if (!jogosAgrupados[rodada]) jogosAgrupados[rodada] = {};

    const dataObjeto = new Date(jogo.data_hora_jogo);
    const diaSemana = dataObjeto.toLocaleDateString('pt-BR', { weekday: 'short' }).toUpperCase().replace('.', '');
    const diaMes = dataObjeto.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    const dataChave = `${diaSemana} - ${diaMes}`;

    if (!jogosAgrupados[rodada][dataChave]) jogosAgrupados[rodada][dataChave] = [];
    jogosAgrupados[rodada][dataChave].push(jogo);
  });

  // ─── Paleta do Google Stitch ──────────────────────────────────────────────────
  const colors = {
    bg: '#131313',
    primary: '#f2ca50',
    primaryDim: 'rgba(242, 202, 80, 0.1)',
    textBase: '#e5e2e1',
    textDim: '#d0c5af',
    border: '#4d4635',
    glassBg: 'rgba(18, 18, 18, 0.8)',
    inputBg: 'rgba(53, 53, 52, 0.4)',
    sidebarBg: 'rgba(14, 14, 14, 0.98)',
  };

  const styles = {
    layout: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: colors.bg,
      color: colors.textBase,
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(242, 202, 80, 0.05) 0%, transparent 50%)',
      backgroundAttachment: 'fixed',
    },
    sidebar: {
      width: '280px',
      backgroundColor: colors.sidebarBg,
      borderRight: `1px solid ${colors.primaryDim}`,
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      height: '100vh',
      left: 0,
      top: 0,
      zIndex: 40,
    },
    sidebarHeader: {
      padding: '30px 24px',
      borderBottom: `1px solid ${colors.primaryDim}`,
    },
    brand: {
      color: colors.primary,
      fontSize: '24px',
      fontWeight: 'bold',
      letterSpacing: '-0.5px',
      marginBottom: '20px',
    },
    userArea: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: colors.inputBg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1px solid ${colors.primaryDim}`,
    },
    navMenu: {
      padding: '24px 0',
      flex: 1,
    },
    navItemActive: {
      padding: '16px 24px',
      borderLeft: `3px solid ${colors.primary}`,
      backgroundColor: 'rgba(29, 79, 64, 0.2)',
      color: colors.primary,
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
    },
    navItem: {
      padding: '16px 24px',
      color: colors.textDim,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
      borderLeft: '3px solid transparent',
      transition: 'all 0.2s',
    },
    mainContent: {
      flex: 1,
      marginLeft: '280px',
      padding: '0',
    },
    topArea: {
      padding: '40px 40px 20px 40px',
      position: 'sticky',
      top: 0,
      backgroundColor: 'rgba(19, 19, 19, 0.8)',
      backdropFilter: 'blur(12px)',
      zIndex: 30,
      borderBottom: `1px solid ${colors.primaryDim}`,
    },
    pageTitle: {
      fontSize: '36px',
      fontWeight: 'bold',
      margin: '0 0 8px 0',
      color: colors.textBase,
    },
    pageSubtitle: {
      color: colors.textDim,
      fontSize: '16px',
      margin: '0 0 24px 0',
    },
    tabsWrapper: {
      display: 'flex',
      gap: '10px',
      overflowX: 'auto',
      paddingBottom: '10px',
    },
    tab: (active) => ({
      padding: '8px 20px',
      borderRadius: '50px',
      fontSize: '12px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      border: active ? `1px solid ${colors.primary}` : `1px solid ${colors.border}`,
      backgroundColor: active ? colors.primaryDim : 'transparent',
      color: active ? colors.primary : colors.textDim,
      transition: 'all 0.2s',
    }),
    contentArea: {
      padding: '40px',
      maxWidth: '1200px',
    },
    groupHeaderContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '20px',
    },
    groupHeaderLineSmall: {
      width: '32px',
      height: '1px',
      backgroundColor: colors.primary,
    },
    groupHeaderLineLarge: {
      flex: 1,
      height: '1px',
      backgroundColor: colors.primaryDim,
    },
    groupTitle: {
      color: colors.primary,
      fontSize: '16px',
      fontWeight: '600',
      letterSpacing: '2px',
      textTransform: 'uppercase',
    },
    dateLabel: {
      color: colors.textDim,
      fontSize: '12px',
      fontWeight: '700',
      letterSpacing: '1px',
      marginBottom: '16px',
      marginLeft: '48px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
      gap: '24px',
      marginBottom: '40px',
    },
    card: {
      backgroundColor: colors.glassBg,
      border: `1px solid ${colors.primaryDim}`,
      borderRadius: '8px',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    },
    cardAccentLine: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '2px',
      backgroundColor: colors.primary,
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
      paddingLeft: '8px',
    },
    timeLabel: {
      color: colors.textDim,
      fontSize: '12px',
      fontWeight: '700',
    },
    stageLabel: {
      color: colors.primary,
      backgroundColor: colors.inputBg,
      border: `1px solid ${colors.primaryDim}`,
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '10px',
      fontWeight: 'bold',
      letterSpacing: '1px',
    },
    matchRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(14, 14, 14, 0.5)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '4px',
      padding: '16px',
      marginBottom: '16px',
    },
    teamSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flex: 1,
    },
    flagCircle: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      border: `1px solid ${colors.border}`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '20px',
    },
    teamName: {
      fontSize: '18px',
      fontWeight: '600',
    },
    inputsSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '0 16px',
    },
    inputBox: {
      width: '48px',
      height: '56px',
      backgroundColor: colors.inputBg,
      border: `1px solid ${colors.border}`,
      borderRadius: '4px',
      color: colors.primary,
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      outline: 'none',
      transition: 'border-color 0.2s',
    },
    multiplySign: {
      color: colors.textDim,
      fontSize: '18px',
      fontWeight: 'bold',
    },
    cardFooter: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingLeft: '8px',
    },
    saveBtn: {
      color: colors.primary,
      background: 'transparent',
      border: 'none',
      fontSize: '12px',
      fontWeight: '700',
      letterSpacing: '1px',
      cursor: 'pointer',
      textTransform: 'uppercase',
    },
    toast: (tipo) => ({
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: tipo === 'erro' ? '#690005' : colors.primary,
      color: tipo === 'erro' ? '#ffdad6' : '#241a00',
      padding: '12px 24px',
      borderRadius: '4px',
      fontWeight: 'bold',
      zIndex: 1000,
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
    })
  };

  if (carregando) {
    return <div style={{...styles.layout, justifyContent: 'center', alignItems: 'center', fontSize: '24px', color: colors.primary}}>Carregando o espetáculo...</div>;
  }

  return (
    <div style={styles.layout}>
      
      {mensagem.texto && <div style={styles.toast(mensagem.tipo)}>{mensagem.texto}</div>}

      {/* SIDEBAR DESKTOP */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.brand}>BOLÃO FIELMINO</div>
          <div style={styles.userArea}>
            <div style={styles.avatar}>👤</div>
            <div>
              <div style={{fontSize: '14px', fontWeight: '600'}}>Membro VIP</div>
              <div style={{fontSize: '12px', color: colors.primary, fontWeight: '700', letterSpacing: '1px'}}>ACESSO LIBERADO</div>
            </div>
          </div>
        </div>
        
        <div style={styles.navMenu}>
          <div style={styles.navItemActive}>
            <span>⚽</span> Palpites
          </div>
          <div style={styles.navItem}>
            <span>📊</span> Classificação
          </div>
          <div style={styles.navItem}>
            <span>⚖️</span> Regulamento
          </div>
        </div>

        <div style={{padding: '24px', borderTop: `1px solid ${colors.primaryDim}`}}>
          <div style={styles.navItem} onClick={fazerLogoff}>
            <span>🚪</span> Sair
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.mainContent}>
        
        {/* HEADER AREA */}
        <div style={styles.topArea}>
          <h1 style={styles.pageTitle}>Palpites da Copa</h1>
          <p style={styles.pageSubtitle}>Trave suas previsões antes do apito inicial. Alta performance, recompensas exclusivas.</p>
          
          <div style={styles.tabsWrapper}>
            <button 
              style={styles.tab(abaAtiva === 'TODAS')}
              onClick={() => setAbaAtiva('TODAS')}
            >
              Todas as Fases
            </button>
            {rodadasUnicas.map(id => (
              <button 
                key={id}
                style={styles.tab(abaAtiva === id)}
                onClick={() => setAbaAtiva(id)}
              >
                {nomesRodadas[id] || `Fase ${id}`}
              </button>
            ))}
          </div>
        </div>

        {/* CARDS AREA */}
        <div style={styles.contentArea}>
          {Object.keys(jogosAgrupados).length === 0 ? (
            <div style={{color: colors.textDim}}>Nenhum jogo encontrado para esta fase.</div>
          ) : (
            Object.keys(jogosAgrupados).sort((a,b) => a - b).map((rodadaId) => (
              <section key={rodadaId}>
                
                <div style={styles.groupHeaderContainer}>
                  <div style={styles.groupHeaderLineSmall}></div>
                  <div style={styles.groupTitle}>{nomesRodadas[rodadaId] || `FASE ${rodadaId}`}</div>
                  <div style={styles.groupHeaderLineLarge}></div>
                </div>
                
                {Object.keys(jogosAgrupados[rodadaId]).map(dataChave => (
                  <div key={dataChave}>
                    <div style={styles.dateLabel}>{dataChave}</div>
                    
                    <div style={styles.grid}>
                      {jogosAgrupados[rodadaId][dataChave].map(jogo => {
                        const horaFormatada = new Date(jogo.data_hora_jogo).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                        
                        return (
                          <div key={jogo.id} style={styles.card}>
                            <div style={styles.cardAccentLine}></div>
                            
                            <div style={styles.cardHeader}>
                              <span style={styles.timeLabel}>{horaFormatada}</span>
                              <span style={styles.stageLabel}>GRUPO / FASE {jogo.rodada_id}</span>
                            </div>

                            <div style={styles.matchRow}>
                              {/* Time 1 */}
                              <div style={styles.teamSection}>
                                <div style={styles.flagCircle}>{getBandeira(jogo.time_casa)}</div>
                                <span style={styles.teamName}>{jogo.time_casa.substring(0,3).toUpperCase()}</span>
                              </div>

                              {/* Inputs */}
                              <div style={styles.inputsSection}>
                                <input 
                                  style={styles.inputBox}
                                  placeholder="-" 
                                  type="text"
                                  maxLength="2"
                                  value={meusPalpites[jogo.id]?.casa ?? ''}
                                  onChange={(e) => handlePalpiteChange(jogo.id, 'casa', e.target.value)}
                                  onFocus={(e) => e.target.style.borderColor = colors.primary}
                                  onBlur={(e) => e.target.style.borderColor = colors.border}
                                />
                                <span style={styles.multiplySign}>×</span>
                                <input 
                                  style={styles.inputBox}
                                  placeholder="-" 
                                  type="text"
                                  maxLength="2"
                                  value={meusPalpites[jogo.id]?.fora ?? ''}
                                  onChange={(e) => handlePalpiteChange(jogo.id, 'fora', e.target.value)}
                                  onFocus={(e) => e.target.style.borderColor = colors.primary}
                                  onBlur={(e) => e.target.style.borderColor = colors.border}
                                />
                              </div>

                              {/* Time 2 */}
                              <div style={{...styles.teamSection, justifyContent: 'flex-end'}}>
                                <span style={styles.teamName}>{jogo.time_fora.substring(0,3).toUpperCase()}</span>
                                <div style={styles.flagCircle}>{getBandeira(jogo.time_fora)}</div>
                              </div>
                            </div>

                            <div style={styles.cardFooter}>
                              <button 
                                style={styles.saveBtn}
                                onClick={() => salvarPalpite(jogo.id)}
                                onMouseEnter={(e) => e.target.style.color = '#fff'}
                                onMouseLeave={(e) => e.target.style.color = colors.primary}
                              >
                                SALVAR PREVISÃO
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </section>
            ))
          )}
        </div>
      </main>
    </div>
  );
}