import localFont from "next/font/local";

const clashDisplayFont = localFont({
  src: [
    {
      path: "./ClashDisplay-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./ClashDisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./ClashDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./ClashDisplay-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default clashDisplayFont;
