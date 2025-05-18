import crypto from "crypto";

const algorithm = "aes-256-cbc"; // You can choose other AES variants like aes-256-gcm
const secretKey = process.env.SECRETE_KEY || "bZy4mv29MHh9ITnS5n6UU52hrJSWRhw8"; // Replace with a strong, securely generated key
const iv = process.env.IV || "7d809a8a04e80a2a"; // Initialization vector, should be unique for each encryption

export function encrypt(text: string) {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { iv: iv, encryptedData: encrypted };
}

export function decrypt(text: string) {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
