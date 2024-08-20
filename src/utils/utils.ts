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

export function formatDateDMY(date: Date) {
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  const formatedMm = mm < 10 ? `0${mm}` : mm.toString();
  const formatedDd = dd < 10 ? `0${dd}` : dd.toString();

  const formatedDate = `${formatedDd}-${formatedMm}-${yyyy}`;
  return formatedDate;
}

export function verbalizeDate(date: Date) {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${day} ${month} ${year}`;
}

export function convertToDateTimeLocalString(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function urlefy(text: string) {
  return `${text
    .toLowerCase()
    .split(" ")
    .reduce((prev, curr) => prev + "_" + curr)}`;
}
