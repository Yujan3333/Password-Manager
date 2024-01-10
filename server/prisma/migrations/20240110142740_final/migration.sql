-- CreateTable
CREATE TABLE "Vault" (
    "id" SERIAL NOT NULL,
    "website" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sitepassword" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Vault_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vault" ADD CONSTRAINT "Vault_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
