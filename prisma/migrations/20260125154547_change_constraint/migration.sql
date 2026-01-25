/*
  Warnings:

  - A unique constraint covering the columns `[monkeyTypeId]` on the table `MonkeytypeResult` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "MonkeytypeResult_uid_key";

-- CreateIndex
CREATE UNIQUE INDEX "MonkeytypeResult_monkeyTypeId_key" ON "MonkeytypeResult"("monkeyTypeId");
