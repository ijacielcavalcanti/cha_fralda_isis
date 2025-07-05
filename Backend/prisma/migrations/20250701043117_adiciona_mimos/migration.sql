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

-- CreateIndex
CREATE UNIQUE INDEX "Mimo_nome_key" ON "Mimo"("nome");
