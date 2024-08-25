import { randomFillSync } from "crypto";
import { extension } from "mime-types";

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
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day} ${month} ${year} ${hours > 10 ? hours : `0${hours}`}:${minutes > 10 ? minutes : `0${minutes}`}`;
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

export function getCurrentDateByTimeZone(timeZone: string = "Asia/Jakarta") {
  return new Date(new Date().toLocaleString("en-US", { timeZone: timeZone }));
}

export function parseLinks(text: string): string {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, (link) => `<a href="${link}">${link}</a>`);
}

/**
 * Downloads a file from the specified URL and triggers a download on the client side.
 *
 * This function uses the Fetch API to retrieve the file as a blob and then
 * programmatically creates a download link for the file, allowing users to
 * download the file to their local device. The file extension is inferred from
 * the `Content-Type` header in the HTTP response.
 *
 * @param {string} url - The URL of the file to download.
 * @param {string} [fileName="file"] - The desired name for the downloaded file, without extension.
 *                                      If not provided, defaults to "file".
 * @returns {Promise<void>} A promise that resolves when the file has been successfully downloaded,
 *                          or rejects with an error if the download fails.
 *
 * @throws {Error} Throws an error if the file fetch operation fails (e.g., due to network issues or an invalid URL).
 *
 * @example
 * // Download a file from the given URL with a custom file name.
 * downloadFile('https://example.com/file.pdf', 'file')
 *   .then(() => console.log('Download successful'))
 *   .catch((error) => console.error('Download failed:', error));
 */
export async function downloadFile(
  url: string,
  fileName: string = "file",
): Promise<void> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch file from ${url}`);
  }

  const blob = await response.blob();
  const link = document.createElement("a");
  const fileExtenstion = extension(
    response.headers.get("Content-Type") || "bin",
  );

  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.${fileExtenstion}`;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);

  return;
}
