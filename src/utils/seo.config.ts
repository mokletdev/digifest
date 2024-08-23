import { Metadata } from "next";

const robots =
  process.env.APP_ENV != "production" ? "noindex, nofollow" : "index, follow";

const baseUrl = process.env.APP_URL;

export const metadata: Metadata = {
  title: {
    default: "Digifest - SMK Telkom Malang",
    template: "%s | Digifest",
  },
  description:
    "Digifest adalah rangkaian acara menarik yang diselenggarakan oleh Dies Natalies SMK Telkom Malang, menghadirkan inovasi dan kreativitas di dunia pendidikan.",
  keywords:
    "Digifest, SMK Telkom Malang, acara pendidikan, inovasi pendidikan, Dies Natalies, festival teknologi, MIFest, Olimawisa, Malang",
  authors: { name: "MokletDev", url: "https://dev.moklet.org" },
  creator: "MokletDev Team",
  publisher: "SMK Telkom Malang",
  robots: robots,
  openGraph: {
    title: "Digifest - SMK Telkom Malang",
    description:
      "Daftar Digifest, festival inovasi pendidikan yang diadakan di SMK Telkom Malang. Temukan berbagai kegiatan menarik!",
    url: baseUrl,
    siteName: "Digifest",
    type: "website",
    images: [
      {
        url: `${baseUrl}/logo-frame-lg.jpeg`,
        width: 1280,
        height: 430,
        alt: "Digifest Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@smktelkommalang",
    title: "Digifest - SMK Telkom Malang",
    description:
      "Digifest adalah festival pendidikan yang menampilkan inovasi dan kreativitas di SMK Telkom Malang.",
    images: [`${baseUrl}/logo-frame-lg.jpeg`],
  },
};
