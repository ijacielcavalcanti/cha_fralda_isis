// frontend/src/components/ItemList.jsx (VERSÃO FINAL COM OS DOIS BOTÕES)

import { useState, useEffect } from 'react';
import { Grid, Box, Typography, Card, CardActionArea, Button } from '@mui/material';
import BackButton from './BackButton.jsx'; // Importamos nosso novo BackButton

// Ícone de Fralda
const DiaperIcon = ({ sx }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ ...sx }}>
    <path d="M20.8,6.9c-0.2-0.5-0.6-0.9-1.1-0.9H18V4c0-1.1-0.9-2-2-2h-4c-1.1,0-2,0.9-2,2v2H8.3c-0.5,0-1,0.4-1.1,0.9L4.4,12h15.2L20.8,6.9z M6,14c-1.1,0-2,0.9-2,2s0.9,2,2,2h12c1.1,0,2-0.9,2-2s-0.9-2-2-2H6z" />
  </svg>
);

// A função agora recebe 'onVoltarClick'
function ItemList({ itemSelecionado, onItemClick, onProximoClick, onVoltarClick }) {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    async function fetchItens() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/itens`);
        const data = await response.json();
        setItens(data);
      } catch (error) { console.error("Falha ao buscar itens:", error); }
    }
    fetchItens();
  }, []);

  return (
    <Box sx={{ textAlign: 'center', width: '100%', maxWidth: '700px', mx: 'auto', pt: { xs: 6, md: 8 } }}>
      <Typography variant="h2" component="h2" sx={{ mb: 4 }}>
        Escolha o Tamanho da Fralda
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {itens.map(item => (
          <Grid xs={6} sm={4} key={item.id}>
            <CardActionArea onClick={() => onItemClick(item.id)} sx={{ borderRadius: '16px' }}>
              <Card
                elevation={itemSelecionado === item.id ? 8 : 2}
                sx={{
                  p: 2, borderRadius: '16px', border: 2,
                  borderColor: itemSelecionado === item.id ? 'primary.main' : 'transparent',
                  transform: itemSelecionado === item.id ? 'scale(1.05)' : 'none',
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, color: itemSelecionado === item.id ? 'primary.main' : 'text.primary' }}>
                  <DiaperIcon sx={{ fontSize: '2.5rem' }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{item.nome}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {item.quantidade_reservada} / {item.quantidade_total_desejada}
                  </Typography>
                </Box>
              </Card>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>

      {/* --- Bloco de Navegação Final --- */}
      {/* Este Box cria um espaço reservado para os botões no final da página */}
      <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, minHeight: '68px' }}>

        {/* O botão Voltar agora é renderizado de forma incondicional nesta tela */}
        <BackButton onClick={onVoltarClick} />

        {/* O botão de Próximo Passo continua condicional, aparecendo apenas após a seleção */}
        {itemSelecionado && (
          <Button
            onClick={onProximoClick}
            variant="contained"
            color="primary"
            sx={{ borderRadius: '50px', px: 5, py: 1.5, fontSize: '1.1rem', textTransform: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
          >
            Escolher Mimo
          </Button>
        )}

      </Box>
    </Box>
  );
}
export default ItemList;