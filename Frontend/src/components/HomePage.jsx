// frontend/src/components/HomePage.jsx (VERSÃO "HÍBRIDA" E CORRETA)

import React from 'react';
import { Grid, Box, Typography, Button, Container } from '@mui/material';
import Fraldometro from './Fraldometro.jsx';
import MuralDeRecados from './MuralDeRecados.jsx';
import ReactCurvedText from 'react-curved-text'; // Mantemos a importação
import iconeGps from '../assets/gps-icon.png';

function HomePage({onConfirmarClick, onMuralClick, onRevelacaoClick}) {
  const endereco = "Rua do morro, 6, Pitangui, Extremoz - RN";
  const googleMapsUrl = `https://www.google.com/maps/place/5°37'44.3"S+35°13'34.4"W/@-5.628969,-35.2310959,881m/data=!3m2!1e3!4b1!4m12!1m7!3m6!1s0x7b3a7005764e4ad:0xbc27e2e8ac10ac5!2sPitangui+Extremoz!8m2!3d-5.6323183!4d-35.2276633!16s%2Fg%2F11vqx103jj!3m3!8m2!3d-5.628969!4d-35.226225?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D`;

  return (
    <Box sx={{ width: '100%', maxWidth: '1100px', mx: 'auto', p: 2 }}>
      <Grid container spacing={4} alignItems="flex-start" justifyContent="center">

        {/* --- ITEM 1 DO GRID: O BLOCO CENTRAL --- */}
        <Grid xs={12} md={7}>
          {/* Esta Box organiza o conteúdo do bloco central */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>

            {/* ---- SEÇÃO TÍTULO ---- */}
            {/* USANDO O SEU CÓDIGO DO REACT-CURVED-TEXT QUE JÁ FUNCIONAVA! */}
            <Box sx={{ textAlign: 'center' }}>
              <ReactCurvedText
                width={420}
                height={100}
                cx={190}
                cy={90}
                rx={210}
                ry={50}
                startOffset={60}
                reversed={true}
                text="CHÁ DE FRALDA DA"
                textProps={{
                  style: {
                    fontSize: 35,
                    letterSpacing: '1.5px',
                    fontFamily: "'Questrial', sans-serif",
                  }
                }}
                textPathProps={{ fill: '#a6265f' }}
                svgProps={{ 'aria-label': 'Chá de Fralda da' }}
              />
              <Typography variant="h1" component="h1" sx={{ color: '#ed7781', fontSize: '8rem', mt: -4 }}>
                Maria Ísis
              </Typography>
            </Box>

            {/* ---- SEÇÃO ENDEREÇO ---- */}
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0, cursor: 'pointer', p: 1, '&:hover': { opacity: 0.8 } }}>
                <img src={iconeGps} alt="ícone de localização" style={{ width: '50px' }} />
                <Box sx={{ textAlign: 'left', color: '#666' }}>
                  <Typography sx={{ fontWeight: 'bold', color: '#333' }}>24 DE AGO - 13H00</Typography>
                  <Typography>Rua coqueirinho - Pitangui</Typography>
                </Box>
              </Box>
            </a>


            {/* ---- SEÇÃO BOTÕES (VERSÃO FINAL MUI) ---- */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 4 }}>
              <Button
                onClick={onConfirmarClick}
                variant="contained" // 'contained' é importante para nos dar um fundo sólido para estilizar
                sx={{
                  // --- Forma e Tamanho ---
                  width: 320,
                  height: 65,
                  borderRadius: '50px', // Cantos super arredondados para a forma de "pílula"
                  border: '2px solid rgba(255, 255, 255, 0.7)', // Borda branca interna sutil

                  // --- Cores e Efeitos ---
                  // Um gradiente rosa sutil como no seu design
                  background: 'linear-gradient(45deg, #F06292, #ed7781)',
                  // O brilho neon, criado com box-shadow
                  boxShadow: '0 0 20px rgba(237, 119, 130, 0.8)',

                  // --- Texto ---
                  color: 'white',
                  fontFamily: 'var(--font-principal)',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  textTransform: 'none', // Impede que o MUI deixe o texto em maiúsculas

                  // --- Efeito Hover ---
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)', // Aumenta o tamanho
                    boxShadow: '0 0 30px rgba(237, 119, 130, 1)', // Aumenta o brilho
                    // Precisamos re-declarar o gradiente para que o MUI não o remova no hover
                    background: 'linear-gradient(45deg, #F06292, #ed7781)',
                  }
                }}
              >
                Confirmar presença
              </Button>

              <Button
                // AQUI ESTÁ A MÁGICA: Conectamos a função ao onClick
                onClick={onRevelacaoClick}
                variant="outlined" // Usamos 'outlined' para um visual secundário
                color="primary"
                sx={{ width: 300, height: 65, borderRadius: '50px', fontSize: '1.2rem', fontWeight: 600, textTransform: 'none' }}
              >
                Revelação
              </Button>
            </Box>
          </Box>
        </Grid>


      </Grid>


      {/* Este é o container, a "prateleira" que vai segurar os dois componentes */}
      <Grid container spacing={0.1} sx={{ mt: 4, alignItems: 'stretch', justifyContent: 'center' }}>
        <Container maxWidth="xl"></Container>

        {/* Coluna da Esquerda para o Mural */}
        <Grid xs={12} md={6}>
          {/* Passamos a função 'onMuralClick' para o componente do mural */}
          <MuralDeRecados onMuralClick={onMuralClick} />
        </Grid>

        {/* Coluna da Direita para o Fraldômetro */}
        <Grid xs={12} md={6}>
          <Fraldometro />
        </Grid>

      </Grid>
    </Box>

  );
}

export default HomePage;  