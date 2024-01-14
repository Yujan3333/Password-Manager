// controllers/VaultController.ts
import { Request, Response } from 'express';
import VaultModel from '../model/vault';
import jwt from "jsonwebtoken";
import config from "../config";

export default class VaultController {

  // GET ALL THE VAULT DATA **********************************************
  static async getAllVaults(req: Request, res: Response) {
    try {
      // const userId = parseInt(req.params.userId, 10);

      // Extract user ID from the JWT token in the request header
      const token = req.headers.authorization?.split(' ')[1];
      // console.log('Received Token',token);
      //if no taken is present
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
      }

      //here config.myTokenKey is the secret key
      const decoded = jwt.verify(token, config.myTokenKey) as { userId: number };
      // console.log('Decoded Token:', decoded);

      if (!decoded.userId) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
      }

      //Got the extracted JWT token
      const userId = decoded.userId;

      const vaults = await VaultModel.getAll(userId);
      res.json(vaults);
    } catch (error) {
      if(error instanceof Error){
      res.status(500).json({ error: error.message });
      }
    }
  }



  // ADD VAULT DATA IN VAULT*******************************************
  static async addVault(req: Request, res: Response) {
    try {
      // const userId = parseInt(req.params.userId, 10);


      // Extract user ID from the JWT token in the request header
     // Extract user ID from the JWT token in the request header
     const token = req.headers.authorization?.split(' ')[1];

     // if no token is present
     if (!token) {
       return res.status(401).json({ error: 'Unauthorized - No token provided' });
     }

     // here config.myTokenKey is the secret key
     const decoded = jwt.verify(token, config.myTokenKey) as { userId: number };

     if (!decoded.userId) {
       return res.status(401).json({ error: 'Unauthorized - Invalid token' });
     }

     // Got the extracted JWT token
     const userId = decoded.userId;

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

  // UPDATE THE VAULT DATA **************************************************************
  static async updateVault(req: Request, res: Response) {
    try {
      const vaultId = parseInt(req.params.vaultId, 10);
      console.log(vaultId);
      const updateData = req.body;
      const vault = await VaultModel.updateVault(vaultId, updateData);
      res.json(vault);
    } catch (error) {
      if(error instanceof Error){
      res.status(500).json({ error: error.message });
      }
    }
  }

  // DELETE THE VAULT DATA *******************************************************
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
