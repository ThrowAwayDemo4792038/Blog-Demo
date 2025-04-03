/*
  Warnings:

  - Added the required column `header` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "header" TEXT NOT NULL;
