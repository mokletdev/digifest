import { hashSync, compareSync } from "bcryptjs";

type cipherText = string;

const BCRYPT_SALT = Number(process.env.SALT_OR_ROUNDS);

export const generateHash = (plainText: string): cipherText => {
  const hashed = hashSync(plainText, BCRYPT_SALT);
  return hashed;
};

export const compareHash = (plainText: string, cipherText: string): boolean => {
  const compare = compareSync(plainText, cipherText);
  return compare;
};
