/*
  Warnings:

  - Added the required column `iv` to the `Vault` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vault" ADD COLUMN     "iv" TEXT NOT NULL;
