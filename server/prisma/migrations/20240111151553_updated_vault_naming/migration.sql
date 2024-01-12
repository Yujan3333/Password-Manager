/*
  Warnings:

  - You are about to drop the column `email_website` on the `Vault` table. All the data in the column will be lost.
  - Added the required column `website_email` to the `Vault` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vault" DROP COLUMN "email_website",
ADD COLUMN     "website_email" TEXT NOT NULL;
