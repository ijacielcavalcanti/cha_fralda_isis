// backend/seed.js (COM LIMPEZA COMPLETA E CORRETA)

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando o script de seed...');

  // --- LIMPEZA NA ORDEM CORRETA ---
  console.log('🧹 Limpando todos os dados antigos...');

  // 1. Limpa as tabelas que possuem "chaves estrangeiras" primeiro.
  await prisma.reservaMimo.deleteMany({});
  await prisma.reservaPresente.deleteMany({});
  await prisma.mensagemMural.deleteMany({}); // <-- A LINHA PRINCIPAL QUE FALTAVA

  // 2. Agora podemos limpar as tabelas principais que eram referenciadas.
  await prisma.convidado.deleteMany({});
  await prisma.mimo.deleteMany({});
  await prisma.itemPresente.deleteMany({});

  console.log('Dados antigos limpos com sucesso!');


  // --- CADASTRO DOS NOVOS DADOS ---
  console.log('🍼 Cadastrando as Fraldas com as quantidades finais...');
  await prisma.itemPresente.createMany({
    data: [
      { nome: 'Fralda P', tipo: 'Fralda', quantidade_total_desejada: 5, quantidade_reservada: 0 },
      { nome: 'Fralda M', tipo: 'Fralda', quantidade_total_desejada: 25, quantidade_reservada: 0 },
      { nome: 'Fralda G', tipo: 'Fralda', quantidade_total_desejada: 20, quantidade_reservada: 0 },
    ],
  });

  console.log('🎁 Cadastrando a nova lista de Mimos...');
  const mimosParaCriar = [
    { nome: 'Cueiros', quantidade_total_desejada: 6 },
    { nome: 'Par de meias', quantidade_total_desejada: 4 },
    { nome: 'Par de luvas', quantidade_total_desejada: 4 },
    { nome: 'Mantas “edredom”', quantidade_total_desejada: 3 },
    { nome: 'Lenço umedecido', quantidade_total_desejada: 15 },
    { nome: 'Toalha', quantidade_total_desejada: 3 },
    { nome: 'Pacote de algodão', quantidade_total_desejada: 3 },
    { nome: 'Lenço seco', quantidade_total_desejada: 3 },
    { nome: 'Perfume', quantidade_total_desejada: 2 },
    { nome: 'Pomada para assadura', quantidade_total_desejada: 3 },
    { nome: 'Escova macia cabelo', quantidade_total_desejada: 1 },
    { nome: 'Shampoo neutro', quantidade_total_desejada: 2 },
    { nome: 'Body manga curta (RN)', quantidade_total_desejada: 2 },
    { nome: 'Body manga longa (RN)', quantidade_total_desejada: 2 },
    { nome: 'Calças com pé', quantidade_total_desejada: 3 },
    { nome: 'Roupinhas 6 meses+', quantidade_total_desejada: 999 },
  ];

  const mimosCompletos = mimosParaCriar.map(mimo => ({
    ...mimo,
    quantidade_reservada: 0,
  }));

  await prisma.mimo.createMany({ data: mimosCompletos });

  console.log('✅ Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });