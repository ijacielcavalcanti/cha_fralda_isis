// frontend/src/components/MimoList.jsx (VERSÃO COM AJUSTES DE ESTILO)

import { useState, useEffect } from 'react';
import { Grid, Box, Typography, Card, CardActionArea, Button } from '@mui/material';
import BackButton from './BackButton.jsx';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

function MimoList({ mimoSelecionado, onMimoClick, onProximoClick, onVoltarClick }) {
  const [mimos, setMimos] = useState([]);

  useEffect(() => {
    async function fetchMimos() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/mimos`);
        const data = await response.json();
        setMimos(data);
      } catch (error) { console.error("Falha ao buscar mimos:", error); }
    }
    fetchMimos();
  }, []);

  return (
    <Box sx={{ textAlign: 'center', width: '100%', maxWidth: '800px', mx: 'auto', pt: { xs: 6, md: 8 } }}>
      <Typography variant="h2" component="h2" sx={{ mb: 4 }}>
        Escolha um Mimo
      </Typography>
      
      {/* A grade agora está configurada para ter no máximo 3 colunas em telas maiores */}
      <Grid container spacing={2} justifyContent="center">
        {mimos.map(mimo => (
          // AQUI ESTÁ A LÓGICA DA GRADE: 2 colunas no mobile (xs=6), 3 colunas no desktop (sm=4)
          <Grid xs={6} sm={4} key={mimo.id}>
            <CardActionArea onClick={() => onMimoClick(mimo.id)} sx={{ borderRadius: '16px' }}>
              <Card 
                elevation={mimoSelecionado === mimo.id ? 8 : 2}
                sx={{
                  // AJUSTE O PADDING (p) PARA CONTROLAR O TAMANHO GERAL DO CARD
                  p: 1, 
                  borderRadius: '16px', border: 2,
                  borderColor: mimoSelecionado === mimo.id ? 'primary.main' : 'transparent',
                  transform: mimoSelecionado === mimo.id ? 'scale(1.05)' : 'none',
                  transition: 'all 0.2s ease-in-out',
                  height: '100%', // Garante que todos os cards na mesma linha tenham a mesma altura
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <Box sx={{ color: mimoSelecionado === mimo.id ? 'primary.main' : 'text.primary' }}>
                  <CardGiftcardIcon sx={{ fontSize: '2rem' }} />
                  {/* AJUSTE O TAMANHO DA FONTE AQUI */}
                  <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}> 
                    {mimo.nome}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {mimo.quantidade_reservada} / {mimo.quantidade_total_desejada}
                  </Typography>
                </Box>
              </Card>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>

      {/* Bloco de Navegação Final */}
      <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, minHeight: '68px' }}>
        <BackButton onClick={onVoltarClick} />
        {mimoSelecionado && (
          <Button 
            onClick={onProximoClick} 
            variant="contained" 
            color="primary" 
            sx={{ borderRadius: '50px', px: 5, py: 1.5, fontSize: '1.1rem', textTransform: 'none' }}
          >
            {/* O texto do botão agora indica o próximo passo */}
            Preencher meus dados
          </Button>
        )}
      </Box>
    </Box>
  );
}
export default MimoList;