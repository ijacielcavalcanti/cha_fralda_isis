// frontend/src/App.jsx (ATUALIZADO PARA A TELA DE REVELAÇÃO)

import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ParticleBackground from './components/ParticleBackground.jsx'; // 1. Importa a animação
import HomePage from './components/HomePage.jsx';
import ItemList from './components/ItemList.jsx';
import MimoList from './components/MimoList.jsx';
import RsvpForm from './components/RsvpForm.jsx';
import MuralCompleto from './components/MuralCompleto.jsx';
import GaleriaFotos from './components/GaleriaFotos.jsx'; // 1. Importa a nova galeria
import WhatsAppButton from './components/WhatsAppButton.jsx';
import BackButton from './components/BackButton.jsx';
import './App.css';
import floralTopLeft from './assets/7.png';
import floralTopRight from './assets/6.png';
import floralBottomLeft from './assets/8.png';
import floralBottomRight from './assets/9.png';

function App() {
  // MUDANÇA 1: O estado 'passo' agora guarda um texto, começando com 'home'
  const [passo, setPasso] = useState('home');
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [mimoSelecionado, setMimoSelecionado] = useState(null);

  // MUDANÇA 2: As funções de navegação agora usam os nomes dos passos
  const handleItemClick = (itemId) => setItemSelecionado(itemId);
  const handleMimoClick = (mimoId) => setMimoSelecionado(mimoId);
  const proximoPasso = () => {
    if (passo === 'home') setPasso('escolha-item');
    if (passo === 'escolha-item') setPasso('escolha-mimo');
    if (passo === 'escolha-mimo') setPasso('formulario');
    if (passo === 'formulario') setPasso('agradecimento');
  };
  const passoAnterior = () => {
    if (passo === 'escolha-mimo') setPasso('escolha-item');
    if (passo === 'formulario') setPasso('escolha-mimo');
  };
  const voltarParaInicio = () => { setPasso('home'); setItemSelecionado(null); setMimoSelecionado(null); };

  // MUDANÇA 3: Uma função específica para ir ao mural
  const irParaMural = () => setPasso('mural-completo');
  // 2. NOVA FUNÇÃO DE NAVEGAÇÃO
  const irParaRevelacao = () => setPasso('revelacao');
  const meuNumeroWhatsApp = '5584991466716';

  return (
    <div className="app-container">
      <ParticleBackground /> {/* 2. Adiciona o componente de partículas aqui */}
      <img src={floralTopLeft} alt="decoração" className="floral-decor top-left" />
      <img src={floralTopRight} alt="decoração" className="floral-decor top-right" />
      <img src={floralBottomLeft} alt="decoração" className="floral-decor bottom-left" />
      <img src={floralBottomRight} alt="decoração" className="floral-decor bottom-right" />

      <Box sx={{ position: 'relative', width: '100%', py: 4 }}>
        {/* O botão 'Voltar' agora tem uma lógica mais clara */}

        {/* O Botão Voltar agora também aparece na tela de Revelação */}
        {/*(passo === 'revelacao') && (
          <Box sx={{ position: 'absolute', top: { xs: 0, md: 4 }, left: { xs: 0, md: 4 } }}>
            <BackButton onClick={voltarParaInicio} />
          </Box>
        )*/}
        {/* MUDANÇA 4: A lógica de renderização agora compara os textos */}
        {passo === 'home' && <HomePage onConfirmarClick={proximoPasso} onMuralClick={irParaMural} onRevelacaoClick={irParaRevelacao} />}
        {passo === 'escolha-item' && <ItemList itemSelecionado={itemSelecionado} onItemClick={handleItemClick} onProximoClick={proximoPasso} onVoltarClick={voltarParaInicio} />}
        {passo === 'escolha-mimo' && <MimoList mimoSelecionado={mimoSelecionado} onMimoClick={handleMimoClick} onProximoClick={proximoPasso} onVoltarClick={passoAnterior} />}
        {passo === 'formulario' && <RsvpForm itemSelecionadoId={itemSelecionado} mimoSelecionadoId={mimoSelecionado} onConfirmacaoSucesso={proximoPasso} onVoltarClick={passoAnterior} />}
        {passo === 'mural-completo' && <MuralCompleto onVoltarClick={voltarParaInicio} />}
        {passo === 'revelacao' && <GaleriaFotos onVoltarClick={voltarParaInicio} />}
        {passo === 'agradecimento' && (
          // Este Box centraliza todo o conteúdo na vertical e horizontal
          <Box sx={{
            textAlign: 'center',
            minHeight: '70vh', // Garante que ocupe boa parte da tela
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Typography variant="h2" sx={{ color: 'primary.main', mb: 2 }}>
              Obrigado por confirmar! ❤️
            </Typography>
            <Typography variant="h5" component="p" sx={{ maxWidth: '500px' }}>
              Sua presença e seu carinho são o maior presente para nós e para nossa bebê.
            </Typography>
            <Typography variant="h5" component="p" sx={{ mb: 4 }}>
              Mal podemos esperar para celebrar com você!
            </Typography>

            {/* Usando nosso botão MUI padrão */}
            <Button onClick={voltarParaInicio} variant="contained" sx={{ borderRadius: '50px', px: 4, py: 1.5 }}>
              Voltar para o Início
            </Button>
          </Box>
        )}
      </Box>

      <WhatsAppButton numero={meuNumeroWhatsApp} />
    </div>
  );
}
export default App;