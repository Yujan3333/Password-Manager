// models/VaultModel.ts
import { PrismaClient } from "@prisma/client";

interface Vault {
  id: number;
  website: string;
  email: string;
  sitepassword: string;
}

const prisma = new PrismaClient();

export default class VaultModel {
  static async getAll(userId: number): Promise<Vault[]> {
    return prisma.vault.findMany({
      where: { userId },
      select: {
        id: true,
        website: true,
        email: true,
        sitepassword: true,
      },
    });
  }

  static async addVault(userId: number, vaultData: any): Promise<Vault> {
    return prisma.vault.create({
      data: {
        website: vaultData.website,
        email: vaultData.email,
        sitepassword: vaultData.sitepassword,
        userId: userId,
      },
    });
  }

  static async updateVault(vaultId: number, updateData: any): Promise<Vault> {
    return prisma.vault.update({
      where: { id: vaultId },
      data: {
        website: updateData.website,
        email: updateData.email,
        sitepassword: updateData.sitepassword,
      },
    });
  }

  static async deleteVault(vaultId: number) {
    return prisma.vault.delete({
      where: { id: vaultId },
    });
  }
}
