import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

// ─── SVGs das bandeiras ────────────────────────────────────────────────────────

const FlagBrasil = ({ width = 54, height = 36 }) => (
  <svg width={width} height={height} viewBox="0 0 54 36">
    <rect width="54" height="36" fill="#009C3B" />
    <polygon points="27,4 50,18 27,32 4,18" fill="#FFDF00" />
    <circle cx="27" cy="18" r="9" fill="#002776" />
    <path d="M19,15.5 Q27,12 35,15.5" stroke="white" strokeWidth="1.5" fill="none" />
  </svg>
);

const FlagArgentina = ({ width = 54, height = 36 }) => (
  <svg width={width} height={height} viewBox="0 0 54 36">
    <rect width="54" height="12" fill="#74ACDF" />
    <rect y="12" width="54" height="12" fill="white" />
    <rect y="24" width="54" height="12" fill="#74ACDF" />
    <circle cx="27" cy="18" r="5" fill="#F6B40E" />
  </svg>
);

const FlagAlemanha = ({ width = 54, height = 36 }) => (
  <svg width={width} height={height} viewBox="0 0 54 36">
    <rect width="54" height="12" fill="#000" />
    <rect y="12" width="54" height="12" fill="#DD0000" />
    <rect y="24" width="54" height="12" fill="#FFCE00" />
  </svg>
);

const FlagFranca = ({ width = 54, height = 36 }) => (
  <svg width={width} height={height} viewBox="0 0 54 36">
    <rect width="18" height="36" fill="#002395" />
    <rect x="18" width="18" height="36" fill="white" />
    <rect x="36" width="18" height="36" fill="#ED2939" />
  </svg>
);

const FlagPortugal = ({ width = 54, height = 36 }) => (
  <svg width={width} height={height} viewBox="0 0 54 36">
    <rect width="21" height="36" fill="#006600" />
    <rect x="21" width="33" height="36" fill="#FF0000" />
    <circle cx="21" cy="18" r="7" fill="#FFFF00" stroke="#003399" strokeWidth="1" />
  </svg>
);

const FlagEspanha = ({ width = 54, height = 36 }) => (
  <svg width={width} height={height} viewBox="0 0 54 36">
    <rect width="54" height="7" fill="#AA151B" />
    <rect y="7" width="54" height="22" fill="#F1BF00" />
    <rect y="29" width="54" height="7" fill="#AA151B" />
  </svg>
);

const FlagInglaterra = ({ width = 54, height = 36 }) => (
  <svg width={width} height={height} viewBox="0 0 54 36">
    <rect width="54" height="36" fill="white" />
    <rect x="23" width="8" height="36" fill="#CF111A" />
    <rect y="14" width="54" height="8" fill="#CF111A" />
  </svg>
);

const FlagHolanda = ({ width = 54, height = 36 }) => (
  <svg width={width} height={height} viewBox="0 0 54 36">
    <rect width="54" height="12" fill="#AE1C28" />
    <rect y="12" width="54" height="12" fill="white" />
    <rect y="24" width="54" height="12" fill="#21468B" />
  </svg>
);

const FlagItalia = ({ width = 54, height = 36 }) => (
  <svg width={width} height={height} viewBox="0 0 54 36">
    <rect width="18" height="36" fill="#009246" />
    <rect x="18" width="18" height="36" fill="white" />
    <rect x="36" width="18" height="36" fill="#CE2B37" />
  </svg>
);

const FlagUruguai = ({ width = 44, height = 30 }) => (
  <svg width={width} height={height} viewBox="0 0 44 30">
    <rect width="44" height="30" fill="white" />
    <rect y="0" width="44" height="3" fill="#009FCA" />
    <rect y="6" width="44" height="3" fill="#009FCA" />
    <rect y="12" width="44" height="3" fill="#009FCA" />
    <rect y="18" width="44" height="3" fill="#009FCA" />
    <rect y="24" width="44" height="3" fill="#009FCA" />
    <rect width="16" height="15" fill="white" />
    <circle cx="8" cy="7.5" r="5" fill="#FFCE00" />
  </svg>
);

const FlagBelgica = ({ width = 44, height = 30 }) => (
  <svg width={width} height={height} viewBox="0 0 44 30">
    <rect width="15" height="30" fill="#000" />
    <rect x="15" width="14" height="30" fill="#FAE042" />
    <rect x="29" width="15" height="30" fill="#ED2939" />
  </svg>
);

const FlagMarrocos = ({ width = 44, height = 30 }) => (
  <svg width={width} height={height} viewBox="0 0 44 30">
    <rect width="44" height="30" fill="#C1272D" />
    <polygon
      points="22,8 23.5,13 28.5,13 24.5,16 26,21 22,18 18,21 19.5,16 15.5,13 20.5,13"
      fill="none"
      stroke="#006233"
      strokeWidth="1.2"
    />
  </svg>
);

const BallSVG = () => (
  <span style={styles.ballIcon}>⚽</span>
);

const TrophySVG = () => (
  <svg width="20" height="20" viewBox="0 0 20 20">
    <path
      d="M5,2h10v8a5,5,0,0,1-10,0ZM3,2h2v5A3,3,0,0,1,2,4V3A1,1,0,0,1,3,2Zm14,0h-2v5a3,3,0,0,0,3-3V3A1,1,0,0,0,17,2ZM7,17v1H6a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2H13V17a5,5,0,0,1-6,0Z"
      fill="#D4AF37"
    />
  </svg>
);

// ─── Dados das bandeiras flutuantes ───────────────────────────────────────────

const FLOATING_FLAGS = [
  { Component: FlagBrasil,     style: { left: '3%',  top: '10%' }, duration: '5s',   delay: '0s'   },
  { Component: FlagArgentina,  style: { left: '86%', top: '9%'  }, duration: '6s',   delay: '1s'   },
  { Component: FlagAlemanha,   style: { left: '6%',  top: '63%' }, duration: '4.5s', delay: '2s'   },
  { Component: FlagFranca,     style: { left: '83%', top: '60%' }, duration: '5.5s', delay: '0.5s' },
  { Component: FlagPortugal,   style: { left: '82%', top: '30%' }, duration: '5s',   delay: '3s'   },
  { Component: FlagEspanha,    style: { left: '3%',  top: '80%' }, duration: '6.5s', delay: '0.8s' },
  { Component: FlagInglaterra, style: { left: '10%', top: '35%' }, duration: '7s',   delay: '1.5s' },
  { Component: FlagHolanda,    style: { left: '84%', top: '78%' }, duration: '4.8s', delay: '2.5s' },
  { Component: FlagItalia,     style: { left: '44%', top: '4%'  }, duration: '5.2s', delay: '1.2s' },
  { Component: FlagUruguai,    style: { left: '14%', top: '87%' }, duration: '5.8s', delay: '3.5s', width: 44, height: 30 },
  { Component: FlagBelgica,    style: { left: '45%', top: '88%' }, duration: '6.2s', delay: '0.3s', width: 44, height: 30 },
  { Component: FlagMarrocos,   style: { left: '72%', top: '84%' }, duration: '4.2s', delay: '2.2s', width: 44, height: 30 },
];

const STRIP_FLAGS = [
  { Component: FlagBrasil,     delay: '0s'   },
  { Component: FlagArgentina,  delay: '0.2s' },
  { Component: FlagFranca,     delay: '0.4s' },
  { Component: FlagAlemanha,   delay: '0.6s' },
  { Component: FlagInglaterra, delay: '0.8s' },
  { Component: FlagPortugal,   delay: '1.0s' },
  { Component: FlagEspanha,    delay: '1.2s' },
  { Component: FlagItalia,     delay: '1.4s' },
];

// ─── Keyframes injetados no <head> ────────────────────────────────────────────

const CSS_KEYFRAMES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

  @keyframes floatFlag {
    0%   { transform: translateY(0px) rotate(-4deg); opacity: 0.9; }
    25%  { transform: translateY(-10px) rotate(3deg); opacity: 1; }
    50%  { transform: translateY(-4px) rotate(-2deg); opacity: 0.85; }
    75%  { transform: translateY(-14px) rotate(4deg); opacity: 1; }
    100% { transform: translateY(0px) rotate(-4deg); opacity: 0.9; }
  }

  @keyframes drift {
    0%   { transform: translateY(0) translateX(0); opacity: 0; }
    10%  { opacity: 0.7; }
    90%  { opacity: 0.3; }
    100% { transform: translateY(-110px) translateX(var(--dx, 20px)); opacity: 0; }
  }

  @keyframes spinBall {
    0%   { transform: rotate(0deg) scale(1); }
    30%  { transform: rotate(120deg) scale(1.08); }
    60%  { transform: rotate(240deg) scale(0.95); }
    100% { transform: rotate(360deg) scale(1); }
  }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(28px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes shimmer {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1; }
  }

  @keyframes pillPulse {
    from { transform: scale(1);    opacity: 0.8; }
    to   { transform: scale(1.12); opacity: 1;   }
  }

  @keyframes streakFall {
    from { transform: translateY(-80px); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 0.4; }
    to   { transform: translateY(110%); opacity: 0; }
  }

  @keyframes modeSlide {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#000',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    overflow: 'hidden',
    position: 'relative',
    padding: '20px 0',
  },
  fieldBg: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(15,50,15,0.35) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  fieldLineH: {
    position: 'absolute', left: 0, right: 0, top: '50%',
    height: '1px', background: 'rgba(212,175,55,0.08)',
  },
  fieldLineV: {
    position: 'absolute', top: 0, bottom: 0, left: '50%',
    width: '1px', background: 'rgba(212,175,55,0.08)',
  },
  fieldBorder: {
    position: 'absolute', left: '5%', right: '5%', top: '5%', bottom: '5%',
    border: '1px solid rgba(212,175,55,0.08)', borderRadius: '4px',
  },
  centerCircle: {
    position: 'absolute',
    width: '200px', height: '200px',
    border: '1px solid rgba(212,175,55,0.07)',
    borderRadius: '50%',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  floatingFlag: (duration, delay) => ({
    position: 'absolute',
    animation: `floatFlag ${duration} linear ${delay} infinite`,
    filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.7))',
    pointerEvents: 'none',
    borderRadius: '3px',
    overflow: 'hidden',
    boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
  }),
  streak: (left, height, duration, delay) => ({
    position: 'absolute',
    left,
    height,
    width: '1px',
    background: 'linear-gradient(180deg, transparent, rgba(212,175,55,0.25), transparent)',
    animation: `streakFall ${duration} linear ${delay} infinite`,
    pointerEvents: 'none',
  }),
  particle: (left, size, duration, delay, dx) => ({
    position: 'absolute',
    left,
    bottom: 0,
    width: size,
    height: size,
    background: '#D4AF37',
    borderRadius: '50%',
    animation: `drift ${duration} linear ${delay} infinite`,
    opacity: 0,
    '--dx': dx,
  }),
  card: {
    position: 'relative',
    zIndex: 10,
    background: 'rgba(10,10,10,0.93)',
    border: '1px solid rgba(212,175,55,0.3)',
    borderRadius: '20px',
    padding: '40px 38px 36px',
    width: '360px',
    boxShadow: '0 0 0 1px rgba(212,175,55,0.08), 0 0 60px rgba(212,175,55,0.1), 0 30px 60px rgba(0,0,0,0.8)',
    animation: 'cardIn 0.7s cubic-bezier(0.22,1,0.36,1) both',
  },
  cardTopLine: {
    position: 'absolute',
    top: 0, left: '10%', right: '10%',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #D4AF37, #FFE566, #D4AF37, transparent)',
    borderRadius: '2px',
    animation: 'shimmer 2.5s ease-in-out infinite',
  },
  ballIcon: {
    fontSize: '52px',
    lineHeight: 1,
    display: 'block',
    textAlign: 'center',
    margin: '0 auto 6px',
    animation: 'spinBall 3s ease-in-out infinite',
    filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.6))',
  },
  trophyLine: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: '10px', marginBottom: '20px',
  },
  dividerLeft: {
    flex: 1, height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5))',
  },
  dividerRight: {
    flex: 1, height: '1px',
    background: 'linear-gradient(90deg, rgba(212,175,55,0.5), transparent)',
  },
  title: {
    fontFamily: "'Bebas Neue', 'Impact', sans-serif",
    fontSize: '36px',
    letterSpacing: '3px',
    color: '#fff',
    textAlign: 'center',
    marginBottom: '3px',
    lineHeight: 1,
  },
  subtitle: {
    fontSize: '11px',
    letterSpacing: '4px',
    color: '#D4AF37',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: '20px',
    opacity: 0.8,
  },

  // ── Toggle login / registro ──
  modeTabs: {
    display: 'flex',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(212,175,55,0.15)',
    borderRadius: '10px',
    padding: '4px',
    marginBottom: '22px',
    gap: '4px',
  },
  modeTab: (active) => ({
    flex: 1,
    padding: '9px 0',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    textAlign: 'center',
    borderRadius: '7px',
    cursor: 'pointer',
    border: 'none',
    fontFamily: "'Inter', sans-serif",
    transition: 'background .2s, color .2s, box-shadow .2s',
    background: active ? '#D4AF37' : 'transparent',
    color: active ? '#000' : 'rgba(212,175,55,0.6)',
    boxShadow: active ? '0 2px 10px rgba(212,175,55,0.3)' : 'none',
  }),

  formSlide: {
    animation: 'modeSlide 0.3s ease both',
  },

  errorBox: {
    background: 'rgba(204,0,0,0.15)',
    border: '1px solid rgba(204,0,0,0.4)',
    color: '#ff6b6b',
    fontSize: '13px',
    textAlign: 'center',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '14px',
    fontWeight: '600',
  },
  successBox: {
    background: 'rgba(0,156,59,0.15)',
    border: '1px solid rgba(0,156,59,0.4)',
    color: '#4caf7d',
    fontSize: '13px',
    textAlign: 'center',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '14px',
    fontWeight: '600',
  },
  formGroup: { marginBottom: '16px' },
  label: {
    display: 'block',
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: 'rgba(212,175,55,0.7)',
    marginBottom: '7px',
  },
  input: {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(212,175,55,0.2)',
    borderRadius: '10px',
    padding: '13px 16px',
    fontSize: '15px',
    color: '#fff',
    outline: 'none',
    fontFamily: "'Inter', sans-serif",
    boxSizing: 'border-box',
    transition: 'border-color .25s, background .25s, box-shadow .25s',
  },
  inputFocus: {
    borderColor: '#D4AF37',
    background: 'rgba(212,175,55,0.06)',
    boxShadow: '0 0 0 3px rgba(212,175,55,0.12)',
  },
  button: {
    width: '100%',
    padding: '15px',
    background: '#D4AF37',
    color: '#000',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '700',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    marginTop: '6px',
    fontFamily: "'Inter', sans-serif",
    transition: 'background .2s, transform .15s, box-shadow .2s',
  },
  buttonHover: {
    background: '#FFE566',
    boxShadow: '0 6px 24px rgba(212,175,55,0.4)',
    transform: 'translateY(-1px)',
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    transform: 'none',
  },
  flagsStrip: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '22px',
    flexWrap: 'wrap',
  },
  stripFlagWrap: (delay) => ({
    borderRadius: '3px',
    overflow: 'hidden',
    boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
    animation: `pillPulse 1.5s ease-in-out ${delay} infinite alternate`,
  }),
};

// ─── Partículas e streaks ──────────────────────────────────────────────────────

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: `${2 + Math.random() * 2}px`,
  duration: `${3 + Math.random() * 5}s`,
  delay: `${Math.random() * 7}s`,
  dx: `${(Math.random() - 0.5) * 70}px`,
}));

const STREAKS = [
  { left: '12%', height: '90px', duration: '4s',   delay: '0s'   },
  { left: '28%', height: '60px', duration: '5.5s', delay: '1.2s' },
  { left: '65%', height: '100px',duration: '3.8s', delay: '0.4s' },
  { left: '80%', height: '70px', duration: '6s',   delay: '2s'   },
];

// ─── Componente principal ─────────────────────────────────────────────────────

export default function Login() {
  const [modo, setModo]             = useState('login'); // 'login' | 'registro'

  // Login
  const [email, setEmail]           = useState('');
  const [senha, setSenha]           = useState('');

  // Registro
  const [regNome, setRegNome]       = useState('');
  const [regEmail, setRegEmail]     = useState('');
  const [regSenha, setRegSenha]     = useState('');
  const [regConfirma, setRegConfirma] = useState('');

  // UI
  const [erro, setErro]             = useState('');
  const [sucesso, setSucesso]       = useState('');
  const [loading, setLoading]       = useState(false);

  const [focusField, setFocusField] = useState(null);
  const [btnHover, setBtnHover]     = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!document.getElementById('bolao-css')) {
      const tag = document.createElement('style');
      tag.id = 'bolao-css';
      tag.innerHTML = CSS_KEYFRAMES;
      document.head.appendChild(tag);
    }
  }, []);

  // Limpa mensagens ao trocar de modo
  const trocarModo = (novoModo) => {
    setErro('');
    setSucesso('');
    setModo(novoModo);
  };

  // ── Login ──
  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', senha);

    try {
      const response = await api.post('/login', formData);
      localStorage.setItem('token', response.data.access_token);
      navigate('/jogos');
    } catch {
      setErro('E-mail ou senha incorretos. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  // ── Registro ──
  const handleRegistro = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (regSenha !== regConfirma) {
      setErro('As senhas não coincidem.');
      return;
    }
    if (regSenha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/usuarios/', {
        nome: regNome,
        email: regEmail,
        senha: regSenha,
      });
      setSucesso('Conta criada com sucesso! Faça o login para entrar.');
      setRegNome('');
      setRegEmail('');
      setRegSenha('');
      setRegConfirma('');
      setTimeout(() => trocarModo('login'), 2000);
    } catch (err) {
      const msg = err?.response?.data?.detail;
      setErro(msg || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // ── Helper para estilo do input ──
  const inputStyle = (field) => ({
    ...styles.input,
    ...(focusField === field ? styles.inputFocus : {}),
  });

  return (
    <div style={styles.container}>

      {/* ── Fundo do campo ── */}
      <div style={styles.fieldBg} />
      <div style={styles.fieldLineH} />
      <div style={styles.fieldLineV} />
      <div style={styles.fieldBorder} />
      <div style={styles.centerCircle} />

      {/* ── Streaks de luz ── */}
      {STREAKS.map((s, i) => (
        <div key={i} style={styles.streak(s.left, s.height, s.duration, s.delay)} />
      ))}

      {/* ── Partículas douradas ── */}
      {PARTICLES.map((p) => (
        <div key={p.id} style={styles.particle(p.left, p.size, p.duration, p.delay, p.dx)} />
      ))}

      {/* ── Bandeiras flutuantes ── */}
      {FLOATING_FLAGS.map(({ Component, style: pos, duration, delay, width, height }, i) => (
        <div key={i} style={{ ...styles.floatingFlag(duration, delay), ...pos }}>
          <Component width={width} height={height} />
        </div>
      ))}

      {/* ── Card ── */}
      <div style={styles.card}>
        <div style={styles.cardTopLine} />

        <BallSVG />

        <div style={styles.trophyLine}>
          <div style={styles.dividerLeft} />
          <TrophySVG />
          <div style={styles.dividerRight} />
        </div>

        <div style={styles.title}>Bolão Fielmino</div>
        <div style={styles.subtitle}>Copa do Mundo 2026</div>

        {/* ── Tabs Login / Registrar ── */}
        <div style={styles.modeTabs}>
          <button
            style={styles.modeTab(modo === 'login')}
            onClick={() => trocarModo('login')}
            type="button"
          >
            Entrar
          </button>
          <button
            style={styles.modeTab(modo === 'registro')}
            onClick={() => trocarModo('registro')}
            type="button"
          >
            Registrar
          </button>
        </div>

        {erro    && <div style={styles.errorBox}>{erro}</div>}
        {sucesso && <div style={styles.successBox}>{sucesso}</div>}

        {/* ══ FORMULÁRIO DE LOGIN ══ */}
        {modo === 'login' && (
          <div key="login" style={styles.formSlide}>
            <form onSubmit={handleLogin}>
              <div style={styles.formGroup}>
                <label style={styles.label}>E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusField('email')}
                  onBlur={() => setFocusField(null)}
                  style={inputStyle('email')}
                  placeholder="seu.email@exemplo.com"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Senha</label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  onFocus={() => setFocusField('senha')}
                  onBlur={() => setFocusField(null)}
                  style={inputStyle('senha')}
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.button,
                  ...(btnHover && !loading ? styles.buttonHover : {}),
                  ...(loading ? styles.buttonDisabled : {}),
                }}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
              >
                {loading ? '⏳ Entrando...' : '⚡ Entrar no Bolão'}
              </button>
            </form>
          </div>
        )}

        {/* ══ FORMULÁRIO DE REGISTRO ══ */}
        {modo === 'registro' && (
          <div key="registro" style={styles.formSlide}>
            <form onSubmit={handleRegistro}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nome</label>
                <input
                  type="text"
                  value={regNome}
                  onChange={(e) => setRegNome(e.target.value)}
                  onFocus={() => setFocusField('regNome')}
                  onBlur={() => setFocusField(null)}
                  style={inputStyle('regNome')}
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>E-mail</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  onFocus={() => setFocusField('regEmail')}
                  onBlur={() => setFocusField(null)}
                  style={inputStyle('regEmail')}
                  placeholder="seu.email@exemplo.com"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Senha</label>
                <input
                  type="password"
                  value={regSenha}
                  onChange={(e) => setRegSenha(e.target.value)}
                  onFocus={() => setFocusField('regSenha')}
                  onBlur={() => setFocusField(null)}
                  style={inputStyle('regSenha')}
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Confirmar Senha</label>
                <input
                  type="password"
                  value={regConfirma}
                  onChange={(e) => setRegConfirma(e.target.value)}
                  onFocus={() => setFocusField('regConfirma')}
                  onBlur={() => setFocusField(null)}
                  style={inputStyle('regConfirma')}
                  placeholder="Repita a senha"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.button,
                  ...(btnHover && !loading ? styles.buttonHover : {}),
                  ...(loading ? styles.buttonDisabled : {}),
                }}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
              >
                {loading ? '⏳ Criando conta...' : '🏆 Criar Conta'}
              </button>
            </form>
          </div>
        )}

        {/* ── Faixa de bandeiras ── */}
        <div style={styles.flagsStrip}>
          {STRIP_FLAGS.map(({ Component, delay }, i) => (
            <div key={i} style={styles.stripFlagWrap(delay)}>
              <Component width={28} height={19} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
