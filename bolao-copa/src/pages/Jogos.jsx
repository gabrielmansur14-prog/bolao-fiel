import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

// ─── Componentes SVG de Bandeiras ───────────────────────────────────────────
const FlagSVG = ({ nome, size = 32 }) => {
  const s = size;
  const r = s / 2;

  const flags = {
    'Brazil': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#009C3B"/>
        <polygon points="16,4 28,16 16,28 4,16" fill="#FFDF00"/>
        <circle cx="16" cy="16" r="6" fill="#002776"/>
        <path d="M10,14 Q16,11 22,14" stroke="white" strokeWidth="1.2" fill="none"/>
      </svg>
    ),
    'Argentina': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#74ACDF"/>
        <rect y="10" width="32" height="12" fill="white"/>
        <circle cx="16" cy="16" r="4" fill="#F6B40E"/>
      </svg>
    ),
    'France': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#ED2939"/>
        <rect width="21" height="32" fill="#002395"/>
        <rect x="10" width="12" height="32" fill="white"/>
      </svg>
    ),
    'Germany': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#FFCE00"/>
        <rect width="32" height="11" fill="#000"/>
        <rect y="11" width="32" height="10" fill="#DD0000"/>
      </svg>
    ),
    'Spain': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#F1BF00"/>
        <rect width="32" height="8" fill="#AA151B"/>
        <rect y="24" width="32" height="8" fill="#AA151B"/>
      </svg>
    ),
    'Portugal': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#FF0000"/>
        <rect width="13" height="32" fill="#006600"/>
        <circle cx="13" cy="16" r="5" fill="#FFFF00" stroke="#003399" strokeWidth="0.8"/>
      </svg>
    ),
    'England': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="white"/>
        <rect x="13" width="6" height="32" fill="#CF111A"/>
        <rect y="13" width="32" height="6" fill="#CF111A"/>
      </svg>
    ),
    'Scotland': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#003078"/>
        <line x1="0" y1="0" x2="32" y2="32" stroke="white" strokeWidth="5"/>
        <line x1="32" y1="0" x2="0" y2="32" stroke="white" strokeWidth="5"/>
      </svg>
    ),
    'Netherlands': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#21468B"/>
        <rect width="32" height="11" fill="#AE1C28"/>
        <rect y="11" width="32" height="10" fill="white"/>
      </svg>
    ),
    'Belgium': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#ED2939"/>
        <rect width="11" height="32" fill="#000"/>
        <rect x="11" width="10" height="32" fill="#FAE042"/>
      </svg>
    ),
    'Italy': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#CE2B37"/>
        <rect width="11" height="32" fill="#009246"/>
        <rect x="11" width="10" height="32" fill="white"/>
      </svg>
    ),
    'Croatia': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#0093DD"/>
        <rect width="32" height="11" fill="#FF0000"/>
        <rect y="11" width="32" height="10" fill="white"/>
      </svg>
    ),
    'Switzerland': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#FF0000"/>
        <rect x="13" y="6" width="6" height="20" fill="white"/>
        <rect x="6" y="13" width="20" height="6" fill="white"/>
      </svg>
    ),
    'Sweden': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#006AA7"/>
        <rect y="12" width="32" height="8" fill="#FECC02"/>
        <rect x="10" width="8" height="32" fill="#FECC02"/>
      </svg>
    ),
    'Norway': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#EF2B2D"/>
        <rect y="12" width="32" height="8" fill="white"/>
        <rect x="10" width="8" height="32" fill="white"/>
        <rect y="13" width="32" height="6" fill="#002868"/>
        <rect x="11" width="6" height="32" fill="#002868"/>
      </svg>
    ),
    'Denmark': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#C60C30"/>
        <rect y="12" width="32" height="8" fill="white"/>
        <rect x="10" width="8" height="32" fill="white"/>
      </svg>
    ),
    'Austria': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#ED2939"/>
        <rect y="11" width="32" height="10" fill="white"/>
      </svg>
    ),
    'Turkey': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#E30A17"/>
        <circle cx="14" cy="16" r="6" fill="white"/>
        <circle cx="16" cy="16" r="5" fill="#E30A17"/>
        <polygon points="20,16 23,14 23,18" fill="white"/>
      </svg>
    ),
    'Czechia': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#D7141A"/>
        <rect width="32" height="16" fill="white"/>
        <polygon points="0,0 14,16 0,32" fill="#11457E"/>
      </svg>
    ),
    'Bosnia-Herzegovina': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#002395"/>
        <polygon points="8,2 24,2 24,30" fill="#FFCE00"/>
      </svg>
    ),
    'Poland': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#DC143C"/>
        <rect width="32" height="16" fill="white"/>
      </svg>
    ),
    'Ukraine': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#FFD700"/>
        <rect width="32" height="16" fill="#005BBB"/>
      </svg>
    ),
    'Serbia': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#0C4076"/>
        <rect width="32" height="11" fill="#C6363C"/>
        <rect y="11" width="32" height="10" fill="#0C4076"/>
      </svg>
    ),
    'United States': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#B22234"/>
        <rect y="3" width="32" height="4" fill="white"/>
        <rect y="10" width="32" height="4" fill="white"/>
        <rect y="17" width="32" height="4" fill="white"/>
        <rect y="24" width="32" height="4" fill="white"/>
        <rect width="14" height="17" fill="#3C3B6E"/>
      </svg>
    ),
    'Mexico': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="white"/>
        <rect width="11" height="32" fill="#006847"/>
        <rect x="21" width="11" height="32" fill="#CE1126"/>
        <circle cx="16" cy="16" r="4" fill="#A0522D"/>
      </svg>
    ),
    'Canada': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="white"/>
        <rect width="8" height="32" fill="#FF0000"/>
        <rect x="24" width="8" height="32" fill="#FF0000"/>
        <polygon points="16,8 18,13 24,13 19,17 21,23 16,19 11,23 13,17 8,13 14,13" fill="#FF0000"/>
      </svg>
    ),
    'Panama': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="white"/>
        <rect width="16" height="16" fill="#DA121A"/>
        <rect x="16" y="16" width="16" height="16" fill="#0D4EA6"/>
        <circle cx="8" cy="24" r="4" fill="#0D4EA6"/>
        <circle cx="24" cy="8" r="4" fill="#DA121A"/>
      </svg>
    ),
    'Haiti': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#D21034"/>
        <rect width="32" height="16" fill="#00209F"/>
      </svg>
    ),
    'Uruguay': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="white"/>
        <rect y="5" width="32" height="4" fill="#009FCA"/>
        <rect y="13" width="32" height="4" fill="#009FCA"/>
        <rect y="21" width="32" height="4" fill="#009FCA"/>
        <circle cx="10" cy="10" r="5" fill="#FFCE00"/>
      </svg>
    ),
    'Paraguay': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="white"/>
        <rect width="32" height="11" fill="#D52B1E"/>
        <rect y="21" width="32" height="11" fill="#009B3A"/>
      </svg>
    ),
    'Ecuador': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#034EA2"/>
        <rect width="32" height="11" fill="#FFD100"/>
        <rect y="11" width="32" height="10" fill="#034EA2"/>
      </svg>
    ),
    'Colombia': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#CE1126"/>
        <rect width="32" height="13" fill="#FCD116"/>
        <rect y="13" width="32" height="10" fill="#003087"/>
      </svg>
    ),
    'Morocco': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#C1272D"/>
        <polygon points="16,8 17.5,13 22.5,13 18.5,16 20,21 16,18 12,21 13.5,16 9.5,13 14.5,13" fill="none" stroke="#006233" strokeWidth="1.2"/>
      </svg>
    ),
    'Senegal': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#FDEF42"/>
        <rect width="11" height="32" fill="#00853F"/>
        <rect x="21" width="11" height="32" fill="#E31B23"/>
        <polygon points="16,11 17,14 20,14 17.5,16 18.5,19 16,17 13.5,19 14.5,16 12,14 15,14" fill="#00853F"/>
      </svg>
    ),
    'Ghana': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#006B3F"/>
        <rect width="32" height="11" fill="#FCD116"/>
        <rect y="11" width="32" height="10" fill="#CE1126"/>
        <polygon points="16,11 17,14 20,14 17.5,16 18.5,19 16,17 13.5,19 14.5,16 12,14 15,14" fill="#000"/>
      </svg>
    ),
    'Egypt': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="white"/>
        <rect width="32" height="11" fill="#CE1126"/>
        <rect y="21" width="32" height="11" fill="#000"/>
        <circle cx="16" cy="16" r="4" fill="#C09300"/>
      </svg>
    ),
    'Algeria': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="white"/>
        <rect width="16" height="32" fill="#006233"/>
        <circle cx="17" cy="16" r="5" fill="#D21034"/>
        <circle cx="19" cy="16" r="4" fill="white"/>
      </svg>
    ),
    'Tunisia': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#E70013"/>
        <circle cx="16" cy="16" r="7" fill="white"/>
        <circle cx="15" cy="16" r="5" fill="#E70013"/>
        <polygon points="20,16 22,14 22,18" fill="white"/>
      </svg>
    ),
    'South Africa': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#007A4D"/>
        <rect y="11" width="32" height="10" fill="white"/>
        <rect y="12" width="32" height="8" fill="#DE3831"/>
        <polygon points="0,0 14,16 0,32" fill="#000"/>
        <polygon points="0,2 12,16 0,30" fill="#FFB81C"/>
      </svg>
    ),
    'Ivory Coast': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="white"/>
        <rect width="11" height="32" fill="#F77F00"/>
        <rect x="21" width="11" height="32" fill="#009A44"/>
      </svg>
    ),
    'Cape Verde Islands': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#003893"/>
        <rect y="17" width="32" height="4" fill="#CF2027"/>
        <rect y="21" width="32" height="2" fill="white"/>
        <circle cx="10" cy="22" r="2" fill="#F7D116"/>
        <circle cx="14" cy="24" r="2" fill="#F7D116"/>
        <circle cx="18" cy="24" r="2" fill="#F7D116"/>
        <circle cx="22" cy="22" r="2" fill="#F7D116"/>
      </svg>
    ),
    'Congo DR': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#007FFF"/>
        <line x1="2" y1="30" x2="30" y2="2" stroke="#F7D618" strokeWidth="4"/>
        <rect width="32" height="10" fill="#CE1021"/>
      </svg>
    ),
    'Mali': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#FCDD09"/>
        <rect width="11" height="32" fill="#14B53A"/>
        <rect x="21" width="11" height="32" fill="#CE1021"/>
      </svg>
    ),
    'Japan': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="white"/>
        <circle cx="16" cy="16" r="8" fill="#BC002D"/>
      </svg>
    ),
    'South Korea': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="white"/>
        <circle cx="16" cy="16" r="7" fill="#CD2E3A"/>
        <path d="M16,9 A7,7,0,0,1,16,23" fill="#003478"/>
        <circle cx="16" cy="16" r="3.5" fill="white"/>
      </svg>
    ),
    'Saudi Arabia': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#006C35"/>
        <rect y="20" width="32" height="6" fill="white"/>
        <text x="16" y="18" textAnchor="middle" fill="white" fontSize="8">ﷺ</text>
      </svg>
    ),
    'Iran': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="white"/>
        <rect width="32" height="11" fill="#239F40"/>
        <rect y="21" width="32" height="11" fill="#DA0000"/>
      </svg>
    ),
    'Iraq': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="white"/>
        <rect width="32" height="11" fill="#CE1126"/>
        <rect y="21" width="32" height="11" fill="#000"/>
        <text x="16" y="19" textAnchor="middle" fill="#007A3D" fontSize="7">الله</text>
      </svg>
    ),
    'Jordan': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#007A3D"/>
        <rect width="32" height="11" fill="#000"/>
        <rect y="21" width="32" height="11" fill="#CE1126"/>
        <polygon points="0,0 12,16 0,32" fill="#fff"/>
      </svg>
    ),
    'Qatar': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#8D1B3D"/>
        <rect width="10" height="32" fill="white"/>
        <polygon points="10,4 16,8 10,12 16,16 10,20 16,24 10,28" fill="#8D1B3D" stroke="#8D1B3D" strokeWidth="0.5"/>
      </svg>
    ),
    'Uzbekistan': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#1EB53A"/>
        <rect width="32" height="11" fill="#1EBFED"/>
        <rect y="21" width="32" height="11" fill="#CE2028"/>
        <rect y="10" width="32" height="12" fill="white"/>
      </svg>
    ),
    'Australia': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#00008B"/>
        <rect width="14" height="14" fill="#00008B"/>
        <line x1="0" y1="0" x2="14" y2="14" stroke="white" strokeWidth="3"/>
        <line x1="14" y1="0" x2="0" y2="14" stroke="white" strokeWidth="3"/>
        <line x1="0" y1="0" x2="14" y2="14" stroke="#CC0001" strokeWidth="1.5"/>
        <line x1="14" y1="0" x2="0" y2="14" stroke="#CC0001" strokeWidth="1.5"/>
        <line x1="7" y1="0" x2="7" y2="14" stroke="white" strokeWidth="3"/>
        <line x1="0" y1="7" x2="14" y2="7" stroke="white" strokeWidth="3"/>
        <line x1="7" y1="0" x2="7" y2="14" stroke="#CC0001" strokeWidth="1.5"/>
        <line x1="0" y1="7" x2="14" y2="7" stroke="#CC0001" strokeWidth="1.5"/>
        <circle cx="22" cy="22" r="3" fill="white"/>
        <circle cx="26" cy="18" r="2" fill="white"/>
        <circle cx="28" cy="24" r="2" fill="white"/>
      </svg>
    ),
    'New Zealand': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#00247D"/>
        <rect width="14" height="14" fill="#00247D"/>
        <line x1="0" y1="0" x2="14" y2="14" stroke="white" strokeWidth="3"/>
        <line x1="14" y1="0" x2="0" y2="14" stroke="white" strokeWidth="3"/>
        <line x1="7" y1="0" x2="7" y2="14" stroke="white" strokeWidth="4"/>
        <line x1="0" y1="7" x2="14" y2="7" stroke="white" strokeWidth="4"/>
        <circle cx="22" cy="10" r="3" fill="#CC142B"/>
        <circle cx="26" cy="18" r="3" fill="#CC142B"/>
        <circle cx="20" cy="20" r="3" fill="#CC142B"/>
        <circle cx="28" cy="14" r="2" fill="#CC142B"/>
      </svg>
    ),
    'Curaçao': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#002B7F"/>
        <rect y="20" width="32" height="6" fill="#F9E814"/>
        <circle cx="10" cy="12" r="2" fill="white"/>
        <circle cx="14" cy="9" r="2" fill="white"/>
      </svg>
    ),
    'Vasco da Gama': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="black"/>
        <text x="16" y="21" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">V</text>
      </svg>
    ),
    'Flamengo': (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#CC0000"/>
        <rect y="12" width="32" height="8" fill="#000"/>
      </svg>
    ),
  };

  const defaultFlag = (
    <svg width={s} height={s} viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="16" fill="#4d4635"/>
      <text x="16" y="21" textAnchor="middle" fill="white" fontSize="12">?</text>
    </svg>
  );

  return flags[nome?.trim()] || defaultFlag;
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
      gap: '10px',
      flex: 1,
    },
    flagCircle: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      border: `1px solid ${colors.border}`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '22px',
      backgroundColor: 'rgba(255,255,255,0.04)',
      flexShrink: 0,
    },
    teamName: {
      fontSize: '16px',
      fontWeight: '600',
      letterSpacing: '0.5px',
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

      {/* SIDEBAR */}
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

      {/* MAIN */}
      <main style={styles.mainContent}>

        <div style={styles.topArea}>
          <h1 style={styles.pageTitle}>Palpites da Copa</h1>
          <p style={styles.pageSubtitle}>Trave suas previsões antes do apito inicial. Alta performance, recompensas exclusivas.</p>

          <div style={styles.tabsWrapper}>
            <button style={styles.tab(abaAtiva === 'TODAS')} onClick={() => setAbaAtiva('TODAS')}>
              Todas as Fases
            </button>
            {rodadasUnicas.map(id => (
              <button key={id} style={styles.tab(abaAtiva === id)} onClick={() => setAbaAtiva(id)}>
                {nomesRodadas[id] || `Fase ${id}`}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.contentArea}>
          {Object.keys(jogosAgrupados).length === 0 ? (
            <div style={{color: colors.textDim}}>Nenhum jogo encontrado para esta fase.</div>
          ) : (
            Object.keys(jogosAgrupados).sort((a, b) => a - b).map((rodadaId) => (
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
                              {/* Time Casa */}
                              <div style={styles.teamSection}>
                                <div style={styles.flagCircle}><FlagSVG nome={jogo.time_casa} size={32} /></div>
                                <span style={styles.teamName}>{jogo.time_casa}</span>
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

                              {/* Time Fora */}
                              <div style={{...styles.teamSection, justifyContent: 'flex-end'}}>
                                <span style={styles.teamName}>{jogo.time_fora}</span>
                                <div style={styles.flagCircle}><FlagSVG nome={jogo.time_fora} size={32} /></div>
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
