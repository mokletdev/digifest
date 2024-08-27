import React, { useCallback, useState } from "react";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";
import { downloadFile } from "@/utils/utils";

interface ImageDownloadableProps {
  src: string;
  alt: string;
  fileName: string;
  height: number;
  width: number;
}

export const ImageDownloadable: React.FC<ImageDownloadableProps> = ({
  src,
  alt,
  fileName,
  height = 300,
  width = 200,
}) => {
  const [loading, setLoading] = useState(false);

  const download = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    await downloadFile(src, fileName);
    setLoading(false);
  }, [loading, src, fileName]);

  return (
    <div
      className="group relative block max-w-[200px] cursor-pointer"
      onClick={download}
      aria-label={`Download ${alt}`}
    >
      <Image
        src={src}
        alt={alt}
        height={height}
        width={width}
        className="block"
      />
      <div className="absolute inset-0 h-full w-full bg-primary-400/60 opacity-0 transition-opacity duration-200 ease-in group-hover:opacity-100">
        <span className="absolute left-1/2 top-1/2 flex translate-x-[-50%] translate-y-[-50%] items-center gap-2 text-center text-white">
          Download
          {loading ? (
            <div
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            ></div>
          ) : (
            <FaDownload />
          )}
        </span>
      </div>
    </div>
  );
};
