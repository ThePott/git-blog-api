-- CreateEnum
CREATE TYPE "MonkeytypeMode" AS ENUM ('time', 'words', 'quote', 'zen', 'custom');

-- CreateTable
CREATE TABLE "MonkeytypeResult" (
    "id" BIGSERIAL NOT NULL,
    "monkeyTypeId" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "wpm" DOUBLE PRECISION NOT NULL,
    "rawWpm" DOUBLE PRECISION NOT NULL,
    "charStats" INTEGER[],
    "acc" DOUBLE PRECISION NOT NULL,
    "mode" "MonkeytypeMode" NOT NULL,
    "mode2" TEXT NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "testDuration" DOUBLE PRECISION NOT NULL,
    "afkDuration" INTEGER NOT NULL,
    "consistency" DOUBLE PRECISION NOT NULL,
    "keyConsistency" DOUBLE PRECISION NOT NULL,
    "punctuation" BOOLEAN,
    "isPb" BOOLEAN,

    CONSTRAINT "MonkeytypeResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MonkeytypeResult_uid_key" ON "MonkeytypeResult"("uid");
