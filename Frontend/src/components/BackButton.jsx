// frontend/src/components/BackButton.jsx (VERSÃO FINAL COM MUI)

import React from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importando o ícone de seta

function BackButton({ onClick }) {
  return (
    <Button
      variant="outlined" // Variante com borda, sem fundo sólido
      onClick={onClick}
      startIcon={<ArrowBackIcon />} // Adiciona o ícone no início
      sx={{
        // Estilo para o botão com fundo branco sutil
        backgroundColor: 'white',
        borderColor: '#ddd',
        color: 'text.secondary',
        textTransform: 'none', // Para o texto não ficar em maiúsculas
        fontWeight: 'bold',
        borderRadius: '50px',
        px: 3, // Espaçamento horizontal interno
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        '&:hover': {
          backgroundColor: '#f5f5f5',
          borderColor: '#bbb',
        }
      }}
    >
      Voltar
    </Button>
  );
}

export default BackButton;