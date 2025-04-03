/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[supabaseId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "isAdmin",
ADD COLUMN     "role" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "supabaseId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Users_supabaseId_key" ON "Users"("supabaseId");
