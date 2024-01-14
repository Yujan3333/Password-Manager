import * as crypto from 'crypto';
import config from "./config";
// Secret key used for encryption and decryption
// const secret = "pppppppppppppppppppppppppppppppp";
const secret=config.secretKey;
console.log(secret.length);

// Function to encrypt a password
const encrypt = (password: string): { iv: string; password: string } => {
    //Buffer is used to work with binary data
  // Generate a random initialization vector (iv) creates a random 16-byte (128-bit) value.During encryption, the IV is combined with the secret key and used in the AES-256-CTR cipher.
  const iv = Buffer.from(crypto.randomBytes(16));   

  // Create a cipher using AES-256-CTR algorithm
  const cipher = crypto.createCipheriv(
    "aes-256-ctr",           // Algorithm: AES-256-CTR (Advanced Encryption Standard with 256-bit key in Counter mode)
    Buffer.from(secret),     // Encryption key provided as a buffer (converted from the secret)
    iv                       // Initialization Vector (IV) used for additional randomness in encryption
  );


//// Encrypt the password using the cipher
  
// Step 1: Convert the password string to a Buffer
// const passwordBuffer = Buffer.from(password);

// Step 2: Use the cipher to update with the password Buffer
// const encryptedPart = cipher.update(passwordBuffer);

// Step 3: Finalize the encryption process
// const finalPart = cipher.final();

// Step 4: Concatenate the encrypted parts into a single Buffer
  const encryptedPassword = Buffer.concat([
    cipher.update(Buffer.from(password)),
    cipher.final(),
  ]);

  // Return the initialization vector and encrypted password as hex strings
  return {
    // Convert the IV (Initialization Vector) Buffer to a hexadecimal string(HUMAN READABLE)
    iv: iv.toString("hex"),
    //Convert the encryptedPassword Buffer to a hexadecimal string(HUMAN READABLE)
    password: encryptedPassword.toString("hex"),
  };
};

// Function to decrypt an encrypted password
const decrypt = (encryption: { iv: string; password: string }): string => {
  // Create a decipher using AES-256-CTR algorithm and provided initialization vector
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(secret), // Use the same secret key used for encryption
    Buffer.from(encryption.iv, "hex") // Convert the IV from hexadecimal string to a Buffer
  );

  // Decrypt the password using the decipher
  const decryptedPassword = Buffer.concat([ 
    decipher.update(Buffer.from(encryption.password, "hex")),
    decipher.final(),
  ]);

  // Return the decrypted password as a string
  return decryptedPassword.toString();
};

// Export the functions for use in other modules
export { encrypt, decrypt };
