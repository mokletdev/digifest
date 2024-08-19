"use client";
import cn from "@/lib/cn";
import { competitionWithCategoriesAndBatches } from "@/types/relation";
import { formatPrice } from "@/utils/utils";
import Image from "next/image";
import { useState } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import {
  FaArrowDown,
  FaArrowRight,
  FaBook,
  FaPeopleGroup,
} from "react-icons/fa6";
import Link from "../_components/global/button";
import {
  Display,
  H1,
  H2,
  H3,
  H4,
  P,
  SectionTitle,
} from "../_components/global/text";

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

function Card({ record, text }: { record: string; text: string }) {
  return (
    <figure className="flex w-full flex-col gap-2 rounded-[10px] border border-neutral-100 bg-neutral-50 px-5 py-3 md:w-auto">
      <H2 className="min-w-[200px] font-normal lg:min-w-[144px]">{record}</H2>
      <P className="text-base">{text}</P>
    </figure>
  );
}

function SubDescription({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="w-full md:max-w-[360px]">
      <H3 className="mb-[10px]">{title}</H3>
      <P>{description}</P>
    </div>
  );
}

function About({ competitionsCount }: { competitionsCount: number }) {
  return (
    <section className="w-full py-[82px]" id="tentang">
      <div className="mb-[64px] flex w-full flex-col items-start justify-between gap-[72px] lg:flex-row lg:items-center lg:gap-2">
        <Image
          src={"/about.svg"}
          width={468}
          height={384}
          alt="About image"
          className="h-auto w-full max-w-[468px]"
        />
        <div className="block w-full lg:max-w-[586px]">
          <SectionTitle>TENTANG</SectionTitle>
          <H1 className="mb-[18px] mt-[22px]">
            Penasaran? Yuk,{" "}
            <span className="text-primary-400">
              Jelajahi Tentang Acara Digifest
            </span>{" "}
            Lebih Lanjut Lagi!
          </H1>
          <P className="mb-[52px]">
            Digifest merupakan acara tahunan yang diadakan menjelang hari ulang
            tahun SMK Telkom Malang pada bulan September. Kali ini, Digifest
            mengadakan {competitionsCount} kompetisi.
          </P>
          <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
            <Card record={`${competitionsCount}`} text="Total kompetisi" />
            <Card record={"300+"} text="Pendaftar" />
            <Card record={"10 Juta"} text="Total hadiah" />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-start justify-between gap-10 md:flex-row md:gap-0">
        <SubDescription
          title="Lorem Ipsum"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ligula
            ipsum, pellentesque ut felis in, porta ultricies massa."
        />
        <SubDescription
          title="Lorem Ipsum"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ligula
            ipsum, pellentesque ut felis in, porta ultricies massa."
        />
        <SubDescription
          title="Lorem Ipsum"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ligula
            ipsum, pellentesque ut felis in, porta ultricies massa."
        />
      </div>
    </section>
  );
}

function CategoryCard({
  title,
  description,
  registrationPrice,
  minMemberCount,
  maxMemberCount,
}: {
  title: string;
  description: string;
  registrationPrice: string;
  minMemberCount: number;
  maxMemberCount: number;
}) {
  return (
    <figure className="flex w-full flex-col items-start justify-between gap-[54px] rounded-[14px] border border-neutral-100 bg-neutral-50 p-[22px] lg:flex-row lg:gap-0">
      <div className="w-full lg:max-w-[854px]">
        <H3 className="mb-[10px]">{title}</H3>
        <P className="mb-8">{description}</P>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-[62px]">
          <div className="flex items-center gap-[14px]">
            <div className="rounded-full bg-primary-50 p-4">
              <FaMoneyBillWave
                className="text-primary-400"
                width={32}
                height={32}
              />
            </div>
            <div className="block">
              <P className="text-base text-black">Biaya Pendaftaran</P>
              <P className="text-base">{registrationPrice}</P>
            </div>
          </div>
          <div className="flex items-center gap-[14px]">
            <div className="rounded-full bg-primary-50 p-4">
              <FaPeopleGroup
                className="text-primary-400"
                width={32}
                height={32}
              />
            </div>
            <div className="block">
              <P className="text-base text-black">Jumlah Peserta</P>
              <P className="text-base">
                {maxMemberCount} - {minMemberCount} orang
              </P>
            </div>
          </div>
        </div>
      </div>
      <Link href="/register" variant={"tertiary"}>
        Daftar sekarang{" "}
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </figure>
  );
}

function Competition({
  competitions,
}: {
  competitions: competitionWithCategoriesAndBatches[];
}) {
  const [selectedCompetition, setSelectedCompetition] = useState<string>(
    competitions[0].name,
  );

  return (
    <section className="w-full py-[82px]" id="kompetisi">
      <div className="mb-[92px] block">
        <div className="w-full lg:max-w-[800px]">
          <SectionTitle>KOMPETISI</SectionTitle>
          <H1 className="mb-[18px] mt-[22px]">
            Mau tau Lebih Lanjut Soal{" "}
            <span className="text-primary-400">
              Kompetisi yang ada di Digifest?
            </span>
          </H1>
          <P className="mb-[54px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            dolores repudiandae laudantium at fuga eius, voluptatem sequi
            fugiat? Unde, fugiat.
          </P>
        </div>
        <div className="flex w-full flex-col items-start justify-between gap-[72px] lg:flex-row lg:items-center lg:gap-0">
          <Link
            href="https://drive.google.com/guidebookbos"
            variant={"primary"}
            className="w-full justify-center sm:w-fit"
          >
            <FaBook />
            Lihat guidebook
          </Link>
          <div className="ites-center flex gap-[14px] rounded-full border border-neutral-100 p-3">
            {competitions.map((competition) => (
              <button
                key={competition.id}
                className={cn(
                  "rounded-full px-[22px] py-[14px] transition-all duration-300 hover:bg-primary-50",
                  competition.name === selectedCompetition
                    ? "bg-primary-400 text-white hover:bg-primary-400"
                    : "",
                )}
                onClick={() => {
                  setSelectedCompetition(competition.name);
                }}
              >
                {competition.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {competitions
          .find((competition) => competition.name === selectedCompetition)
          ?.competitionCategories.map((category) => (
            <CategoryCard
              title={category.name}
              description={category.description}
              minMemberCount={category.minMemberCount}
              maxMemberCount={category.maxMemberCount}
              registrationPrice={
                category.registrationBatches.length > 0
                  ? formatPrice(
                      Number(
                        category.registrationBatches[
                          category.registrationBatches.length - 1
                        ].registrationPrice,
                      ),
                      "IDR",
                      "id-ID",
                    )
                  : "Belum ada ketentuan"
              }
            />
          ))}
      </div>
    </section>
  );
}

export { About, Competition, Hero };
