import { hashSync, compareSync } from "bcrypt";

type cipherText = string;

const BCRYPT_ROUNDS = process.env.SALT_OR_ROUNDS;

export const generateHash = (plainText: string): cipherText => {
  const hashed = hashSync(plainText, BCRYPT_ROUNDS);
  return hashed;
};

export const compareHash = (plainText: string, cipherText: string): boolean => {
  const compare = compareSync(plainText, cipherText);
  return compare;
};
