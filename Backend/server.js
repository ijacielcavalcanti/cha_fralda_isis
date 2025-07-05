// backend/server.js (VERSÃO FINAL, COMPLETA E VALIDADA)

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// --- ROTAS DE LEITURA (GET) ---
app.get('/mensagens', async (req, res) => {
  try {
    const mensagens = await prisma.mensagemMural.findMany({
      // Vamos buscar apenas as mensagens que já foram aprovadas
      where: {
        aprovada: true,
      },
      // E ordenar das mais recentes para as mais antigas
      orderBy: {
        data_envio: 'desc',
      },
    });
    res.json(mensagens);
  } catch (error) {
    console.error("Falha ao buscar mensagens do mural:", error);
    res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
  }
});

app.get('/itens', async (req, res) => {
  try {
    const itens = await prisma.itemPresente.findMany({ orderBy: { id: 'asc' } });
    res.json(itens);
  } catch (error) {
    console.error("Falha ao buscar itens:", error);
    res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
  }
});

app.get('/mimos', async (req, res) => {
  try {
    const mimos = await prisma.mimo.findMany({ orderBy: { id: 'asc' } });
    res.json(mimos);
  } catch (error) {
    console.error("Falha ao buscar mimos:", error);
    res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
  }
});

app.get('/estatisticas/fraldas', async (req, res) => {
  try {
    const agregacao = await prisma.itemPresente.aggregate({
      _sum: {
        quantidade_reservada: true,
        quantidade_total_desejada: true,
      },
      where: {
        tipo: 'Fralda',
      },
    });
    res.json({
      totalReservado: agregacao._sum.quantidade_reservada || 0,
      totalDesejado: agregacao._sum.quantidade_total_desejada || 0,
    });
  } catch (error) {
    console.error("Falha ao buscar estatísticas das fraldas:", error);
    res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
  }
});


// --- ROTA DE ESCRITA TRANSACIONAL (POST) ---
app.post('/confirmar', async (req, res) => {
  const { nome, celular, mensagem, itemPresenteId, mimoId } = req.body;

  try {
    const resultado = await prisma.$transaction(async (tx) => {
      const item = await tx.itemPresente.findUnique({ where: { id: itemPresenteId } });
      if (!item) throw new Error(`Item de presente com ID ${itemPresenteId} não encontrado.`);
      if (item.quantidade_reservada >= item.quantidade_total_desejada) {
        throw new Error(`Estoque esgotado para o item: ${item.nome}`);
      }
      await tx.itemPresente.update({
        where: { id: itemPresenteId },
        data: { quantidade_reservada: { increment: 1 } },
      });

      const mimo = await tx.mimo.findUnique({ where: { id: mimoId } });
      if (!mimo) throw new Error(`Mimo com ID ${mimoId} não encontrado.`);
      if (mimo.quantidade_reservada >= mimo.quantidade_total_desejada) {
        throw new Error(`Estoque esgotado para o mimo: ${mimo.nome}`);
      }
      await tx.mimo.update({
        where: { id: mimoId },
        data: { quantidade_reservada: { increment: 1 } },
      });

      const novoConvidado = await tx.convidado.create({
        data: {
          nome,
          celular,
          adultos: 1,
          criancas: 0,
          confirmacao_presenca: true,
          data_confirmacao: new Date(),
        },
      });

      await tx.reservaPresente.create({
        data: { convidado_id: novoConvidado.id, item_presente_id: itemPresenteId },
      });
      await tx.reservaMimo.create({
        data: { convidado_id: novoConvidado.id, mimo_id: mimoId },
      });

      if (mensagem && mensagem.trim() !== '') {
        await tx.mensagemMural.create({
          data: {
            nome_remetente: novoConvidado.nome,
            mensagem: mensagem,
            convidado_id: novoConvidado.id,
            aprovada: true 
          }
        });
      }

      return { convidado: novoConvidado };
    });

    res.status(201).json({ success: true, message: 'Presença e presentes confirmados com sucesso!', data: resultado });

  } catch (error) {
    console.error("Falha na transação:", error.message);
    res.status(409).json({ success: false, message: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}!`);
});