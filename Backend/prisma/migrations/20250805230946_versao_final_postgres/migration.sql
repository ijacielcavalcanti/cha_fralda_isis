-- CreateTable
CREATE TABLE "Convidado" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "celular" TEXT,
    "adultos" INTEGER NOT NULL,
    "criancas" INTEGER NOT NULL DEFAULT 0,
    "confirmacao_presenca" BOOLEAN NOT NULL DEFAULT false,
    "data_confirmacao" TIMESTAMP(3),

    CONSTRAINT "Convidado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemPresente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "tamanho" TEXT,
    "quantidade_total_desejada" INTEGER NOT NULL,
    "quantidade_reservada" INTEGER NOT NULL DEFAULT 0,
    "imagem_url" TEXT,

    CONSTRAINT "ItemPresente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservaPresente" (
    "id" SERIAL NOT NULL,
    "convidado_id" INTEGER NOT NULL,
    "item_presente_id" INTEGER NOT NULL,
    "data_reserva" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReservaPresente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mimo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "quantidade_total_desejada" INTEGER NOT NULL,
    "quantidade_reservada" INTEGER NOT NULL DEFAULT 0,
    "imagem_url" TEXT,

    CONSTRAINT "Mimo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReservaMimo" (
    "id" SERIAL NOT NULL,
    "convidado_id" INTEGER NOT NULL,
    "mimo_id" INTEGER NOT NULL,
    "data_reserva" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReservaMimo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MensagemMural" (
    "id" SERIAL NOT NULL,
    "nome_remetente" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "data_envio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aprovada" BOOLEAN NOT NULL DEFAULT false,
    "convidado_id" INTEGER,

    CONSTRAINT "MensagemMural_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemPresente_nome_key" ON "ItemPresente"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Mimo_nome_key" ON "Mimo"("nome");

-- AddForeignKey
ALTER TABLE "ReservaPresente" ADD CONSTRAINT "ReservaPresente_convidado_id_fkey" FOREIGN KEY ("convidado_id") REFERENCES "Convidado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaPresente" ADD CONSTRAINT "ReservaPresente_item_presente_id_fkey" FOREIGN KEY ("item_presente_id") REFERENCES "ItemPresente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaMimo" ADD CONSTRAINT "ReservaMimo_convidado_id_fkey" FOREIGN KEY ("convidado_id") REFERENCES "Convidado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReservaMimo" ADD CONSTRAINT "ReservaMimo_mimo_id_fkey" FOREIGN KEY ("mimo_id") REFERENCES "Mimo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MensagemMural" ADD CONSTRAINT "MensagemMural_convidado_id_fkey" FOREIGN KEY ("convidado_id") REFERENCES "Convidado"("id") ON DELETE SET NULL ON UPDATE CASCADE;
