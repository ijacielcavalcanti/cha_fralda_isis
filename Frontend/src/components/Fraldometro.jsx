// frontend/src/components/Fraldometro.jsx (COM TÍTULO CURVADO)
import { useState, useEffect } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import ReactCurvedText from 'react-curved-text'; // Importamos a biblioteca
import cestoImagem from '../assets/3.png';

function Fraldometro() {
  const [estatisticas, setEstatisticas] = useState({ totalReservado: 0, totalDesejado: 110 }); // Meta de 110
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEstatisticas() {
      try {
        const response = await fetch('http://localhost:3000/estatisticas/fraldas');
        const data = await response.json();
        if (data.totalDesejado > 0) {
          setEstatisticas(data);
        }
      } catch (error) {
        console.error("Falha ao buscar estatísticas:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEstatisticas();
  }, []);

  const porcentagem = estatisticas.totalDesejado > 0 
    ? (estatisticas.totalReservado / estatisticas.totalDesejado) * 100 
    : 0;

  return (
    <Box sx={{ textAlign: 'center', color: 'var(--cor-principal)', width: '280px' }}>
      {/* TÍTULO CURVADO */}
      <ReactCurvedText
        width={280}
        height={70}
        cx={140}
        cy={80}
        rx={120}
        ry={40}
        startOffset={40}
        reversed={true}
        text="FRALDÔMETRO"
        textProps={{ style: { fontSize: 24, letterSpacing: '1.5px', fontFamily: "'Questrial', sans-serif" } }}
        textPathProps={{ fill: '#a6265f' }}
      />

      <img src={cestoImagem} alt="Cesto de fraldas" style={{ width: '150px', marginTop: '-20px' }} />

      <Typography variant="body1" sx={{ fontWeight: '600', fontSize: '1rem', mt: -1 }}>
        Já garantimos {estatisticas.totalReservado} de {estatisticas.totalDesejado} pacotes de fraldas!
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', mt: 1 }}>
        <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
          {estatisticas.totalReservado}/{estatisticas.totalDesejado}
        </Typography>
        <Box sx={{ width: '50%', mx: 1 }}>
          <LinearProgress variant="determinate" value={porcentagem} color="primary" sx={{ height: 12, borderRadius: 5 }} />
        </Box>
        <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
          {Math.round(porcentagem)}%
        </Typography>
      </Box>
    </Box>
  );
}
export default Fraldometro;