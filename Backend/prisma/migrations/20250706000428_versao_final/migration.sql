-- CreateTable
CREATE TABLE "Convidado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "celular" TEXT,
    "adultos" INTEGER NOT NULL,
    "criancas" INTEGER NOT NULL DEFAULT 0,
    "confirmacao_presenca" BOOLEAN NOT NULL DEFAULT false,
    "data_confirmacao" DATETIME
);

-- CreateTable
CREATE TABLE "ItemPresente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "tamanho" TEXT,
    "quantidade_total_desejada" INTEGER NOT NULL,
    "quantidade_reservada" INTEGER NOT NULL DEFAULT 0,
    "imagem_url" TEXT
);

-- CreateTable
CREATE TABLE "ReservaPresente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "convidado_id" INTEGER NOT NULL,
    "item_presente_id" INTEGER NOT NULL,
    "data_reserva" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ReservaPresente_convidado_id_fkey" FOREIGN KEY ("convidado_id") REFERENCES "Convidado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReservaPresente_item_presente_id_fkey" FOREIGN KEY ("item_presente_id") REFERENCES "ItemPresente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Mimo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "quantidade_total_desejada" INTEGER NOT NULL,
    "quantidade_reservada" INTEGER NOT NULL DEFAULT 0,
    "imagem_url" TEXT
);

-- CreateTable
CREATE TABLE "ReservaMimo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "convidado_id" INTEGER NOT NULL,
    "mimo_id" INTEGER NOT NULL,
    "data_reserva" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ReservaMimo_convidado_id_fkey" FOREIGN KEY ("convidado_id") REFERENCES "Convidado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReservaMimo_mimo_id_fkey" FOREIGN KEY ("mimo_id") REFERENCES "Mimo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MensagemMural" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_remetente" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "data_envio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aprovada" BOOLEAN NOT NULL DEFAULT false,
    "convidado_id" INTEGER,
    CONSTRAINT "MensagemMural_convidado_id_fkey" FOREIGN KEY ("convidado_id") REFERENCES "Convidado" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemPresente_nome_key" ON "ItemPresente"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Mimo_nome_key" ON "Mimo"("nome");
