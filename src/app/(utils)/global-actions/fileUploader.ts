"use server";

import { UploadApiResponse } from "cloudinary";

import cloudinary from "@/lib/cloudinary";

export async function uploadImage(file: Buffer) {
  try {
    const upload: UploadApiResponse | undefined = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET },
            (error, uploadResult) => {
              if (error) reject(error);
              return resolve(uploadResult);
            },
          )
          .end(file);
      },
    );

    if (!upload) return { success: false, message: "Terjadi kesalahan" };

    const data = {
      format: upload.format,
      url: upload.secure_url,
    };

    return { success: true, message: "Upload berhasil!", data };
  } catch (e) {
    console.error(e);
    const error = e as Error;
    return {
      success: false,
      message: error.message.includes("not allowed")
        ? error.message
        : "Terjadi kesalahan!",
    };
  }
}
