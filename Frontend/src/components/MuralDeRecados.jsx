// frontend/src/components/MuralDeRecados.jsx (VERSÃO FINAL COM MUI E ANIMAÇÃO)
import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import './MuralDeRecados.css'; // Continuaremos usando um CSS para a animação complexa

function MuralDeRecados({ onMuralClick }) {
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    async function fetchMensagens() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/mensagens`);
        if (!response.ok) return; // Se a resposta não for OK, não faz nada
        const data = await response.json();
        setMensagens(data);
      } catch (error) {
        console.error("Falha ao buscar mensagens do mural:", error);
      }
    }
    fetchMensagens();
  }, []);

  // Agora, mesmo sem mensagens, o container existe, mas fica vazio
  return (
    // Adicionamos o evento onClick e um cursor de ponteiro a toda a área
    <Box className="mural-container" onClick={onMuralClick} sx={{ cursor: 'pointer' }}>
      <Typography variant="h5" sx={{ fontFamily: 'var(--font-titulo)', color: 'var(--cor-principal)', textAlign: 'center', mb: 2 }}>
        Recadinhos
      </Typography>
      <Box className="mural-animacao-wrapper">
        {mensagens.slice(0, 3).map((msg, index) => (
          <Paper key={msg.id} elevation={4} className={`recado-card card-animacao-${index + 1}`}>
            <Typography sx={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#666' }}>
              "{msg.mensagem}"
            </Typography>
            <Typography sx={{ fontWeight: 'bold', fontSize: '0.8rem', color: 'primary.main', textAlign: 'right', mt: 1 }}>
              - {msg.nome_remetente}
            </Typography>
          </Paper>
        ))}
      </Box>
      <Button variant="text" color="primary" sx={{ mt: 2, textTransform: 'none', fontWeight: 'bold' }}>
        (Ver todos)
      </Button>
    </Box>
  );
}
export default MuralDeRecados;