// routes/vaultRoutes.ts
import express from 'express';
import VaultController from '../controller/vault';
import { validateReqBody } from '../middleware/validator';
import { addVaultSchema } from '../schema/vault';

const router = express.Router();

router.get('/', VaultController.getAllVaults);

// router.get('/:vaultId', VaultController.getVaultById);

// router.post('/', VaultController.addVault);
router.post('/',validateReqBody(addVaultSchema), VaultController.addVault);

// router.put('/:vaultId', VaultController.updateVault);
router.put('/:vaultId',validateReqBody(addVaultSchema), VaultController.updateVault);

router.delete('/:vaultId', VaultController.deleteVault);

export default router;
