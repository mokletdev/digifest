import prisma from "@/lib/prisma";
import Image from "next/image";
import { Display, H4, P } from "../_components/global/text";
import Link from "../_components/global/button";
import { FaArrowDown } from "react-icons/fa6";
import cn from "@/lib/cn";

function Hero({
  competitions,
}: {
  competitions: { logo: string; name: string; description: string }[];
}) {
  return (
    <header
      id="beranda"
      className="flex w-full flex-col-reverse items-start justify-between gap-[72px] py-[82px] sm:gap-[92px] lg:flex-row lg:items-center lg:gap-[110px]"
    >
      <div className="block w-full lg:w-[661px]">
        <Display className="mb-[18px]">
          <span className="text-primary-400">Rasakan Semangat</span> Tahunan di
          Digifest SMK Telkom Malang
        </Display>
        <P className="mb-[54px]">
          Berkompetisi dengan semangat tahunan Moklet melalui Digifest, rayakan
          pencapaian dan inovasi dalam ajang untuk menampilkan kreativitas dan
          bakat-bakat luar biasa.
        </P>
        <div className="flex flex-col divide-y divide-neutral-200">
          {competitions.map((competition, i) => (
            <div
              key={competition.name}
              className={cn(
                "flex items-center justify-between",
                i === competitions.length ? "pt-6" : "",
                i === 0 ? "pb-6" : "",
                i !== competitions.length && i !== 0 ? "py-6" : "",
              )}
            >
              <div className="flex items-start gap-2">
                <Image
                  src={competition.logo}
                  width={20}
                  height={20}
                  alt={`Logo ${competition.name}`}
                  className="h-auto w-5"
                  unoptimized
                />
                <div className="block max-w-[240px]">
                  <H4>{competition.name}</H4>
                  <P className="line-clamp-1">{competition.description}</P>
                </div>
              </div>
              <Link
                href={`#${competition.name.toLowerCase()}`}
                variant={"tertiary"}
              >
                Lihat{" "}
                <FaArrowDown className="transition-transform duration-300 group-hover:translate-y-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Image
        src={"/hero.svg"}
        width={393.24}
        height={518}
        alt="Hero image"
        className="h-auto w-full max-w-[393.24px]"
      />
    </header>
  );
}

export default async function Home() {
  const [competitions] = await prisma.$transaction([
    prisma.competition.findMany(),
  ]);

  return (
    <>
      <Hero
        competitions={competitions.map(({ name, logo, description }) => ({
          name,
          logo,
          description,
        }))}
      />
    </>
  );
}
