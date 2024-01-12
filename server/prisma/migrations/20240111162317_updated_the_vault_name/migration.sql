/*
  Warnings:

  - You are about to drop the column `website_email` on the `Vault` table. All the data in the column will be lost.
  - You are about to drop the column `website_name` on the `Vault` table. All the data in the column will be lost.
  - You are about to drop the column `website_password` on the `Vault` table. All the data in the column will be lost.
  - Added the required column `email` to the `Vault` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sitepassword` to the `Vault` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Vault` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vault" DROP COLUMN "website_email",
DROP COLUMN "website_name",
DROP COLUMN "website_password",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "sitepassword" TEXT NOT NULL,
ADD COLUMN     "website" TEXT NOT NULL;
