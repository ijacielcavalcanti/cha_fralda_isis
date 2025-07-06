// frontend/src/components/RsvpForm.jsx (VERSÃO FINAL COM MUI)

import { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import BackButton from './BackButton.jsx';

function RsvpForm({ itemSelecionadoId, mimoSelecionadoId, onConfirmacaoSucesso, onVoltarClick }) {
  const [formData, setFormData] = useState({
    nome: '',
    celular: '',
    mensagem: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(estadoAnterior => ({ ...estadoAnterior, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dadosParaEnviar = {
      nome: formData.nome,
      celular: formData.celular,
      mensagem: formData.mensagem,
      itemPresenteId: itemSelecionadoId,
      mimoId: mimoSelecionadoId,
    };

    try {
      const response = await fetch('${import.meta.env.VITE_API_URL}/confirmar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosParaEnviar),
      });
      if (response.ok) {
        onConfirmacaoSucesso(); 
      } else {
        const errorData = await response.json();
        alert(`Opa! Tivemos um problema: ${errorData.message}`); 
      }
    } catch (error) {
      console.error('Erro de rede ou conexão:', error);
      alert('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
    }
  };

  return (
    <Box sx={{ textAlign: 'center', width: '100%', maxWidth: '500px', mx: 'auto', pt: { xs: 6, md: 8 } }}>
      <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
        Confirme sua Presença
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Falta pouco! Por favor, preencha seus dados.
      </Typography>

      {/* O 'component="form"' faz a Box se comportar como um formulário */}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

        {/* O TextField é o input de texto do MUI, muito mais elegante */}
        <TextField
          label="Seu nome completo"
          name="nome"
          value={formData.nome}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          required
        />

        <TextField
          label="Celular (com DDD)"
          name="celular"
          type="tel"
          value={formData.celular}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          required
        />

        <TextField
          label="Deixe um recado para a M. Ísis"
          name="mensagem"
          value={formData.mensagem}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          multiline // Permite múltiplas linhas, como uma <textarea>
          rows={4}
        />

        {/* Nosso bloco de navegação final */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <BackButton onClick={onVoltarClick} />
          <Button 
            type="submit"
            variant="contained" 
            color="primary" 
            sx={{ borderRadius: '50px', px: 4, py: 1.5, fontSize: '1rem', textTransform: 'none' }}
          >
            Confirmar e Reservar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default RsvpForm;