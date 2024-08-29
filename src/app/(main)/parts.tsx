"use client";
import cn from "@/lib/cn";
import {
  formatDateDMY,
  formatPrice,
  getCurrentDateByTimeZone,
  urlefy,
  verbalizeDate,
} from "@/utils/utils";
import Image from "next/image";
import { default as NextLink } from "next/link";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import {
  FaArrowDown,
  FaArrowRight,
  FaBook,
  FaGreaterThan,
  FaLocationDot,
  FaPeopleGroup,
} from "react-icons/fa6";
import Link, { Button } from "../_components/global/button";
import {
  Display,
  H1,
  H2,
  H3,
  H4,
  P,
  SectionTitle,
} from "../_components/global/text";
import { LandingPageContext } from "./contexts";

function Hero() {
  const context = useContext(LandingPageContext);
  const { competitions } = context!;

  return (
    <header
      id="beranda"
      className="flex w-full flex-col items-start justify-between gap-[72px] pb-[82px] pt-[41px] sm:gap-[92px] lg:flex-row lg:items-center lg:gap-[110px]"
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
                  className="h-auto w-5 object-cover"
                  unoptimized
                  loading="eager"
                />
                <div className="block max-w-[240px]">
                  <H4>{competition.name}</H4>
                  <P className="line-clamp-1">{competition.description}</P>
                </div>
              </div>
              <Link href={`#kompetisi`} variant={"tertiary"}>
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
        loading="eager"
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

function About() {
  const context = useContext(LandingPageContext);
  const { competitions } = context!;
  const competitionsCount = competitions.length;

  return (
    <section className="w-full py-[82px]" id="tentang">
      <div className="mb-[64px] flex w-full flex-col items-start justify-between gap-[72px] lg:flex-row lg:items-center lg:gap-2">
        <Image
          src={"/about.svg"}
          width={468}
          height={384}
          alt="About image"
          className="h-auto w-full max-w-[468px]"
          loading="eager"
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
            <Card record={"150+"} text="Pendaftar" />
            <Card record={"40 Juta+"} text="Total hadiah" />
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
  competitionName,
  description,
  registrationPrice,
  maxMemberCount,
}: {
  title: string;
  competitionName: string;
  description: string;
  registrationPrice: string;
  maxMemberCount: number;
}) {
  return (
    <NextLink
      href={`/dashboard/${urlefy(competitionName)}/${urlefy(title)}/register`}
      className="group"
    >
      <figure className="flex w-full flex-col items-start justify-between gap-[54px] rounded-[14px] border border-neutral-100 p-[22px] transition-all duration-300 group-hover:bg-neutral-50 lg:flex-row lg:gap-0">
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
                <P className="text-base">{maxMemberCount} orang</P>
              </div>
            </div>
          </div>
        </div>
        <span className="flex items-center gap-2 transition-colors duration-300 group-hover:text-primary-400">
          Daftar sekarang{" "}
          <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </figure>
    </NextLink>
  );
}

function Competition() {
  const context = useContext(LandingPageContext);
  const { competitions } = context!;

  const [selectedCompetition, setSelectedCompetition] = useState<string>(
    competitions.length > 0 ? competitions[0].name : "",
  );
  const [competitionObject, setCompetitionObject] = useState(
    competitions.find(
      (competition) => competition.name === selectedCompetition,
    ),
  );
  const [openCategories, setOpenCategories] = useState(
    competitionObject
      ? competitionObject.competitionCategories.filter((category) => {
          const currentDate = getCurrentDateByTimeZone();
          return category.registrationBatches.find(
            ({ openedDate, closedDate }) =>
              currentDate >= openedDate && currentDate <= closedDate,
          );
        })
      : [],
  );

  useEffect(() => {
    setCompetitionObject(
      competitions.find(
        (competition) => competition.name === selectedCompetition,
      )!,
    );

    if (competitionObject) {
      setOpenCategories(
        competitionObject.competitionCategories.filter((category) => {
          const currentDate = getCurrentDateByTimeZone();
          return category.registrationBatches.find(
            ({ openedDate, closedDate }) =>
              currentDate >= openedDate && currentDate <= closedDate,
          );
        }),
      );
    }
  }, [selectedCompetition, competitions, competitionObject]);

  return (
    <section className="w-full py-[82px]" id="kompetisi">
      <div className="mb-[92px] block">
        <div className="w-full lg:max-w-[800px]">
          <SectionTitle>KOMPETISI</SectionTitle>
          <H1 className="mb-[18px] mt-[22px]">
            Mau tau Lebih Lanjut Soal{" "}
            <span className="text-primary-400">Kompetisi yang ada</span> di
            Digifest?
          </H1>
          <P className="mb-[54px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            dolores repudiandae laudantium at fuga eius, voluptatem sequi
            fugiat? Unde, fugiat.
          </P>
        </div>
        <div className="flex w-full flex-col items-start justify-between gap-[72px] lg:flex-row lg:items-center lg:gap-0">
          {competitionObject && (
            <Link
              href={competitionObject.guidebookUrl}
              variant={"primary"}
              className="w-full justify-center sm:w-fit"
            >
              <FaBook />
              Lihat guidebook {competitionObject.name}
            </Link>
          )}
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
        {competitionObject && openCategories.length > 0 ? (
          openCategories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.name}
              competitionName={competitionObject.name}
              description={category.description}
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
          ))
        ) : (
          <P>Belum ada informasi apa-apa, nih...</P>
        )}
      </div>
    </section>
  );
}

function SubTimeline({
  startDate,
  endDate,
  title,
  description,
  location,
}: {
  startDate: Date;
  endDate: Date;
  title: string;
  description: string;
  location: string;
}) {
  return (
    <figure className="flex w-full flex-col rounded-[14px] border border-neutral-100 p-4">
      <P className="mb-3 text-black">
        <time dateTime={formatDateDMY(startDate)}>
          {verbalizeDate(startDate)}
        </time>{" "}
        -{" "}
        <time dateTime={formatDateDMY(endDate)}>{verbalizeDate(endDate)}</time>
      </P>
      <H3 className="mb-[10px]">{title}</H3>
      <P className="mb-6">{description}</P>
      <P className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-base text-primary-400">
        <FaLocationDot /> {location}
      </P>
    </figure>
  );
}

function Timeline() {
  const context = useContext(LandingPageContext);
  const { competitions } = context!;

  const [selectedCompetition, setSelectedCompetition] = useState<string>(
    competitions.length > 0 ? competitions[0].name : "",
  );
  const [competitionObject, setCompetitionObject] = useState(
    competitions.find(
      (competition) => competition.name === selectedCompetition,
    )!,
  );

  useEffect(() => {
    setCompetitionObject(
      competitions.find(
        (competition) => competition.name === selectedCompetition,
      )!,
    );
  }, [competitions, selectedCompetition]);

  return (
    <section className="w-full py-[82px]" id="timeline">
      <div className="mb-[92px] block">
        <div className="w-full">
          <SectionTitle>TIMELINE</SectionTitle>
          <H1 className="mb-[18px] mt-[22px]">
            Penasaran Kapan{" "}
            <span className="text-primary-400">Waktu Pelaksanaan</span> Acara
            Digifest?
          </H1>
          <P className="mb-[54px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            dolores repudiandae laudantium at fuga eius, voluptatem sequi
            fugiat? Unde, fugiat.
          </P>
        </div>
        <div className="flex w-full flex-col items-start justify-between gap-[72px] lg:flex-row lg:items-center lg:gap-0">
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
      <div className="flex flex-col gap-10">
        {competitionObject ? (
          competitionObject.competitionCategories.map((category) => (
            <div key={category.id} className="block">
              <H2 className="mb-7">Bidang {category.name}</H2>
              <div className="grid w-full grid-cols-1 gap-[18px] gap-y-[52px] md:grid-cols-2 lg:grid-cols-3">
                {category.registrationBatches.length === 0 &&
                  category.stages.length === 0 && (
                    <P>Belum ada informasi, nih...</P>
                  )}
                {category.registrationBatches
                  .sort(
                    (a, b) => a.openedDate.getTime() - b.openedDate.getTime(),
                  )
                  .map((batch, i) => (
                    <SubTimeline
                      key={batch.id}
                      startDate={batch.openedDate}
                      endDate={batch.closedDate}
                      title={`Pendaftaran Batch ${i + 1}`}
                      description={`Pembukaan pendaftaran batch ${i === 0 ? "pertama" : `ke-${i}`}`}
                      location={
                        i === category.registrationBatches.length - 1
                          ? "Online"
                          : "SMK Telkom Malang"
                      }
                    />
                  ))}
                {category.stages
                  .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
                  .map((stage, i) => (
                    <SubTimeline
                      key={stage.id}
                      startDate={stage.startDate}
                      endDate={stage.endDate}
                      title={stage.name}
                      description={stage.description}
                      location={
                        i === category.registrationBatches.length - 1
                          ? "Online"
                          : "SMK Telkom Malang"
                      }
                    />
                  ))}
              </div>
            </div>
          ))
        ) : (
          <P>Belum ada informasi apa-apa, nih...</P>
        )}
      </div>
    </section>
  );
}

const faqs = [
  {
    question:
      "Apakah bisa membayar juri untuk mengapresiasi (dan memenagkan lomba)?",
    answer:
      "Tentu boleh, kami sangat mendukung sistem penilaian ekonomis yang menilai peserta dari kemampuan ekonominya.",
  },
  {
    question:
      "Apakah bisa membayar juri untuk mengapresiasi (dan memenagkan lomba)?",
    answer:
      "Tentu boleh, kami sangat mendukung sistem penilaian ekonomis yang menilai peserta dari kemampuan ekonominya.",
  },
  {
    question:
      "Apakah bisa membayar juri untuk mengapresiasi (dan memenagkan lomba)?",
    answer:
      "Tentu boleh, kami sangat mendukung sistem penilaian ekonomis yang menilai peserta dari kemampuan ekonominya.",
  },
  {
    question:
      "Apakah bisa membayar juri untuk mengapresiasi (dan memenagkan lomba)?",
    answer:
      "Tentu boleh, kami sangat mendukung sistem penilaian ekonomis yang menilai peserta dari kemampuan ekonominya.",
  },
];

function SubQuestion({
  i,
  question,
  answer,
  setActiveIndex,
  isActive,
}: {
  i: number;
  question: string;
  answer: string;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
  isActive?: boolean;
}) {
  return (
    <div className="flex items-start justify-between rounded-[14px] border border-neutral-100 bg-neutral-50 p-[22px]">
      <div className="w-full lg:max-w-[614px]">
        <H3 className={`font-normal ${isActive ? "mb-[18px]" : ""}`}>
          {question}
        </H3>
        <P className={isActive ? "block" : "hidden"}>{answer}</P>
      </div>
      <Button
        onClick={() => {
          setActiveIndex(isActive ? null : i);
        }}
        variant={"primary"}
      >
        <FaGreaterThan
          className={cn(
            "h-[150%] transition-all duration-300",
            isActive ? "rotate-90" : "",
          )}
        />
      </Button>
    </div>
  );
}

function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      className="flex w-full flex-col items-start justify-between py-[82px] lg:flex-row"
      id="faq"
    >
      <div className="mb-[72px] block w-full sm:mb-[92px] lg:mb-0 lg:max-w-[320px]">
        <SectionTitle>FAQ</SectionTitle>
        <H1 className="mb-[18px] mt-[22px]">
          <span className="text-primary-400">Mau Bertanya?</span> Pastiin Belum
          ada Disini, ya!
        </H1>
        <P className="mb-[54px]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, amet.
        </P>
        <div className="flex flex-col gap-4">
          <Link
            href="https://wa.me/6282142070672"
            variant={"primary"}
            className="justify-center"
          >
            Hubungi CP 1
          </Link>
          <Link
            href="https://wa.me/6285103655672"
            variant={"primary"}
            className="justify-center"
          >
            Hubungi CP 2
          </Link>
        </div>
      </div>
      <div className="flex w-full flex-col gap-[18px] lg:max-w-[734px]">
        {faqs.map((q, i) => (
          <SubQuestion
            key={i}
            i={i}
            isActive={i === activeIndex}
            setActiveIndex={setActiveIndex}
            {...q}
          />
        ))}
      </div>
    </section>
  );
}

export { About, Competition, FAQ, Hero, Timeline };
