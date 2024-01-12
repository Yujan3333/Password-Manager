// controllers/VaultController.ts
import { Request, Response } from 'express';
import VaultModel from '../model/vault';

export default class VaultController {
  static async getAllVaults(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId, 10);
      const vaults = await VaultModel.getAll(userId);
      res.json(vaults);
    } catch (error) {
      if(error instanceof Error){
      res.status(500).json({ error: error.message });
      }
    }
  }

  static async addVault(req: Request, res: Response) {
    try {
      // const userId = parseInt(req.params.userId, 10);
      const userId=9; //hardcoded for checking
      const vaultData = req.body;
      console.log(vaultData);
      const vault = await VaultModel.addVault(userId, vaultData);
      res.status(201).json(vault);
    } catch (error) {
      if(error instanceof Error){
      res.status(500).json({ error: error.message });
      }
    }
  }

  static async updateVault(req: Request, res: Response) {
    try {
      const vaultId = parseInt(req.params.vaultId, 10);
      const updateData = req.body;
      const vault = await VaultModel.updateVault(vaultId, updateData);
      res.json(vault);
    } catch (error) {
      if(error instanceof Error){
      res.status(500).json({ error: error.message });
      }
    }
  }

  static async deleteVault(req: Request, res: Response) {
    try {
      const vaultId = parseInt(req.params.vaultId, 10);
      await VaultModel.deleteVault(vaultId);
      // res.sendStatus(204);
      res.status(200).json({ message: 'Vault deleted successfully' });
    } catch (error) {
      if(error instanceof Error){
      res.status(500).json({ error: error.message });
      }
    }
  }
}
