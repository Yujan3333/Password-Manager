/*
  Warnings:

  - You are about to drop the column `email` on the `Vault` table. All the data in the column will be lost.
  - You are about to drop the column `sitepassword` on the `Vault` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Vault` table. All the data in the column will be lost.
  - Added the required column `email_website` to the `Vault` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website_name` to the `Vault` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website_password` to the `Vault` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vault" DROP COLUMN "email",
DROP COLUMN "sitepassword",
DROP COLUMN "website",
ADD COLUMN     "email_website" TEXT NOT NULL,
ADD COLUMN     "website_name" TEXT NOT NULL,
ADD COLUMN     "website_password" TEXT NOT NULL;
