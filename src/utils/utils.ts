import { randomFillSync } from "crypto";

export function stringifyCompleteDate(date: Date) {
  const year = date.getFullYear(),
    month = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2),
    hour = ("0" + date.getHours()).slice(-2),
    minute = ("0" + date.getMinutes()).slice(-2);
  return `${year}/${month}/${day} at ${hour}:${minute}`;
}

export async function fileToBuffer(file: File) {
  const fileBuffer = await file.arrayBuffer();
  return Buffer.from(fileBuffer);
}

export function generateRandomString(length: number): string {
  const buffer = Buffer.alloc(length);
  randomFillSync(buffer);

  return buffer.toString("base64").slice(0, length);
}

export function formatPrice(
  amount: number,
  currency: string,
  locales: string = "en-US",
): string {
  return new Intl.NumberFormat(locales, {
    style: "currency",
    currency,
  }).format(amount);
}
