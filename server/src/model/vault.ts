// models/VaultModel.ts
import { PrismaClient } from "@prisma/client";
import { encrypt , decrypt} from "../encryptionHandles";

interface Vault {
  id: number;
  website: string;
  email: string;
  sitepassword: string;
}

const prisma = new PrismaClient();

export default class VaultModel {
  static async getAll(userId: number): Promise<Vault[]> {
    // return prisma.vault.findMany({
    //   where: { userId },
    //   select: {
    //     id: true,
    //     website: true,
    //     email: true,
    //     sitepassword: true,
    //     iv:true,
    //   },
    // });
    const encryptedVaults = await prisma.vault.findMany({
      where: { userId },
      select: {
        id: true,
        website: true,
        email: true,
        sitepassword: true,
        iv: true,
      },
    });

    // Decrypt the passwords before returning the result
    const decryptedVaults = encryptedVaults.map((vault) => ({
      id: vault.id,
      website: vault.website,
      email: vault.email,
      sitepassword: decrypt({ iv: vault.iv, password: vault.sitepassword }),
      iv: vault.iv,
    }));

    return decryptedVaults;
  }

  static async addVault(userId: number, vaultData: any): Promise<Vault> {
    //encypting the password before saving it
    const encryptedPassword=encrypt(vaultData.sitepassword);
    //returns a iv and password as a object.
    return prisma.vault.create({
      data: {
        website: vaultData.website,
        email: vaultData.email,
        // sitepassword: vaultData.sitepassword,
        sitepassword: encryptedPassword.password,
        iv:encryptedPassword.iv,
        userId: userId,
      },
    });
  }

  static async updateVault(vaultId: number, updateData: any): Promise<Vault> {
    //encypting the password before saving it
    const encryptedPassword=encrypt(updateData.sitepassword);
    //returns a iv and password as a object.
    return prisma.vault.update({
      where: { id: vaultId },
      data: {
        website: updateData.website,
        email: updateData.email,
        // sitepassword: updateData.sitepassword,
        sitepassword:encryptedPassword.password,
        iv:encryptedPassword.iv,
        
      },
    });
  }

  static async deleteVault(vaultId: number) {
    return prisma.vault.delete({
      where: { id: vaultId },
    });
  }
}
