// frontend/src/components/MuralCompleto.jsx (VERSÃO COM LAYOUT REFINADO)

import React, { useState, useEffect } from 'react';
import { Grid, Box, Paper, Typography, CircularProgress, Button } from '@mui/material';
import BackButton from './BackButton.jsx'; // Importamos o botão voltar

function MuralCompleto({ onVoltarClick }) {
  const [mensagens, setMensagens] = useState([]);
  const [loading, setLoading] = useState(true);     


  useEffect(() => {
    async function fetchMensagens() {
      try {
        const response = await fetch('${import.meta.env.VITE_API_URL}/mensagens');
        const data = await response.json();
        setMensagens(data);
      } catch (error) {
        console.error("Falha ao buscar mensagens:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMensagens();
  }, []);

  if (loading) {
    // Mostra um indicador de carregamento enquanto busca os dados
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  }

  return (
    // Container principal que centraliza todo o mural na página
    <Box sx={{ width: '100%', maxWidth: '900px', mx: 'auto', p: 2, pt: { xs: 6, md: 8 } }}>

      {/* Cabeçalho: Título e Botão Voltar alinhados */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <BackButton onClick={onVoltarClick} />
        {/* O título agora usa a cor primária do nosso tema */}
        <Typography variant="h2" sx={{ color: 'secundary.main' }}>
          Mural de Recados
        </Typography>
        {/* Um item invisível para manter o título perfeitamente centralizado */}
        <Box sx={{ width: '88px' }} /> 
      </Box>

      {/* O Grid que contém os cards de recado */}
      <Grid container spacing={0} justifyContent="center">
        {mensagens.map((msg) => (
          <Grid item xs={12} sm={5} md={4} key={msg.id}
            // O sx aqui controla a sobreposição e o efeito de profundidade
            sx={{
              m: 1.6, // A margem negativa "puxa" os cards, criando a sobreposição
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)', // Card cresce no hover
                zIndex: 10, // Garante que o card em hover fique por cima dos outros
              }
            }}
          >
            <Paper elevation={4} sx={{ p: 2, height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(3px)', border: '1px solid', borderColor: 'primary.main', boxShadow: `0 0 12px rgba(237, 119, 130, 0.5)` }}>
              <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 1 }}>
                "{msg.mensagem}"
              </Typography>
              <Typography variant="caption" display="block" sx={{ fontWeight: 'bold', color: 'primary.main', textAlign: 'right' }}>
                - {msg.nome_remetente}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default MuralCompleto;