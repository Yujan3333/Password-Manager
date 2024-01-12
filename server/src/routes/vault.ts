// routes/vaultRoutes.ts
import express from 'express';
import VaultController from '../controller/vault';

const router = express.Router();

router.get('/:userId', VaultController.getAllVaults);
// router.get('/:vaultId', VaultController.getVaultById);
router.post('/', VaultController.addVault);
router.put('/:vaultId', VaultController.updateVault);
router.delete('/:vaultId', VaultController.deleteVault);

export default router;
