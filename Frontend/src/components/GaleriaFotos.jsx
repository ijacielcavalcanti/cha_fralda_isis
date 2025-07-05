// frontend/src/components/GaleriaFotos.jsx (VERSÃO FINAL POLAROID COM MUI)

import React from 'react';
import { Grid, Box, Paper, Typography } from '@mui/material';
import BackButton from './BackButton.jsx';

// Importe suas fotos
import foto1 from '../assets/revelacao/foto1.jpg';
import foto2 from '../assets/revelacao/foto2.jpg';
import foto3 from '../assets/revelacao/foto3.jpg';
import foto4 from '../assets/revelacao/foto4.jpg';
import foto5 from '../assets/revelacao/foto5.jpg';
import foto6 from '../assets/revelacao/foto6.jpg';

const listaDeFotos = [foto1, foto2, foto3, foto4, foto5, foto6];

function GaleriaFotos({ onVoltarClick }) {
  return (
    <Box sx={{ width: '100%', maxWidth: '900px', mx: 'auto', py: 4 }}>
      {/* Cabeçalho da página */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 5, position: 'relative', justifyContent: 'center' }}>
        <Box sx={{ position: 'absolute', left: 0 }}>
          <BackButton onClick={onVoltarClick} />
        </Box>
        <Typography variant="h2" sx={{ color: 'var(--cor-principal)' }}>
          Nossa Doce Espera
        </Typography>
      </Box>

      {/* O Grid que cria nosso layout responsivo */}
      <Grid container spacing={4} justifyContent="center">
        {listaDeFotos.map((foto, index) => (
          // A SINTAXE CORRETA: sem a prop 'item'
          // sm={6} -> 2 colunas em telas de tablet e maiores
          <Grid xs={12} sm={6} md={4} key={index}>

            {/* O Paper do MUI será nossa moldura Polaroid */}
            <Paper
              elevation={6} // Controla o tamanho da sombra
              sx={{
                p: '12px', // Padding geral de 12px
                pb: '60px', // Padding-bottom maior para o estilo Polaroid
                bgcolor: 'white',
                borderRadius: '4px',
                position: 'relative',
                transition: 'transform 0.3s ease',
                // Inclinação aleatória para cada card
                transform: `rotate(${ (index % 2 === 0 ? 1 : -1) * (2 + index % 3) }deg)`,
                '&:hover': {
                  transform: 'scale(1.05) rotate(0deg)', // No hover, a foto cresce e fica reta
                  zIndex: 10,
                }
              }}
            >
              <img 
                src={foto} 
                alt={`Foto do chá revelação ${index + 1}`} 
                style={{ width: '100%', display: 'block' }} 
              />
              {/* Poderíamos adicionar uma legenda aqui no futuro */}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default GaleriaFotos;