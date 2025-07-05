// frontend/src/theme.js (ATUALIZADO E CORRIGIDO)
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // Definindo nossa paleta de cores
  palette: {
    primary: {
      main: '#ed7781', // A sua cor exata do tema!
    },
    secondary: {
      main: '#fce4ec',
    },
  },
  // Definindo nossas fontes
  typography: {
    fontFamily: "'Questrial', sans-serif",
    // Estilo padrão para todos os H1 do site
    // Dentro de frontend/src/theme.js, na seção typography
    h1: {
      fontFamily: "'Kolker Brush', cursive", // <-- AQUI ESTÁ A MUDANÇA
      fontSize: '9rem', // Fontes "brush" costumam ser mais finas, então aumentamos o tamanho
      color: '#ed7781',
      lineHeight: 1, // Ajusta a altura da linha para a nova fonte
      textTransform: 'none', // Garante que não fique em maiúsculas
    },
    // Estilo padrão para todos os H2 do site
    h2: {
      fontFamily: "'Questrial', sans-serif",
      fontSize: '1.8rem',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      color: '#a6265f',
    },
  },
});

export default theme;