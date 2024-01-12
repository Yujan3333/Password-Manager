import vaultModel from "../model/vault";
import NotFoundError from "../error/notFoundError";
import { VaultInterface } from "../interface/vaultInterface";

// export const getAll = async () => {
//   const data = await VaultModel.getAll();

//   return data;
// };

// export const getById = async (id: number) => {
//   const data = await VaultModel.getById(id);

//   if (!data) {
//     throw new NotFoundError(`vault with id: ${id} not found`);
//   }

//   return data;
// };

export const getAll = async (userId:number) => {
    const data = await vaultModel.getAll(userId);
    // console.log(data);
    return (data); 
  }

// export const update = async (id: number, body: VaultInterface) => {
//   const vault = await VaultModel.getById(id);

//   if (!vault) {
//     throw new NotFoundError(`vault with id: ${id} not found`);
//   }

//   await VaultModel.update(id, body);

//   const updatedVault = await VaultModel.getById(id);

//   return updatedVault;
// };

export const addVault = async (
    // userId:number,
      website:string, 
      email:string,
      password:string,
    ) => {
        const result = {
        //   userId:userId,
          website:website,
          email:email,
          password:password,
          };
          // console.log(`From axios and service ${JSON.stringify(result)}`);
  
        const data = await vaultModel.addVault(result);
        return data; 
    }


// export const deleteVault = async (id: number) => {
//   const vault = await VaultModel.getById(id);

//   if (!vault) {
//     throw new NotFoundError(`vault with id: ${id} not found`);
//   }

//   await VaultModel.delete(id);
// };

export const deleteVault = async (vaultId:number) => {
    const data = await vaultModel.deleteVault(vaultId);
    // console.log(data);
    return (data); 
  }

  export const updateVault = async (vaultId:number,newVaultObject:any) => {
    const data = await vaultModel.updateVault(vaultId,newVaultObject);
    // console.log(data);
    return (data); 
  }