"use client";
import cn from "@/lib/cn";
import { formatPrice, getCurrentDateByTimeZone, urlefy } from "@/utils/utils";
import { signOut } from "next-auth/react";
import { default as NextLink } from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import { FaArrowRight, FaMoneyBillWave, FaPeopleGroup } from "react-icons/fa6";
import Link, { Button } from "../_components/global/button";
import { H1, H3, P, SectionTitle } from "../_components/global/text";
import { DashboardContext } from "./contexts";

function GreetingBoard() {
  const context = useContext(DashboardContext);
  const user = context?.user!;

  return (
    <section className="rounded-xl border border-neutral-100 bg-neutral-50 p-4">
      <div className="flex w-full flex-col items-start justify-between gap-10 md:flex-row md:gap-0">
        <div className="block">
          {!user.verified && (
            <SectionTitle>Email belum diverifikasi</SectionTitle>
          )}
          <H1 className="mb-2 mt-3">
            Selamat Datang,{" "}
            <span className="text-primary-400">{user.name}</span>
          </H1>
          <P>
            Belum mendaftarkan tim anda?{" "}
            <NextLink
              href={"/dashboard#kompetisi"}
              className="transtiion-all text-primary-400 duration-300 hover:text-primary-200"
            >
              Daftar sekarang!
            </NextLink>{" "}
            Atau cek data tim anda pada halaman detail kompetisi jika sudah
            mendaftar.
          </P>
        </div>
        <Button
          onClick={() => signOut({ callbackUrl: "/" })}
          variant={"primary"}
        >
          Logout
        </Button>
      </div>
    </section>
  );
}

function CategoryCard({
  competition,
  title,
  description,
  registrationPrice,
  maxMemberCount,
  registrationsCount,
}: {
  competition: string;
  title: string;
  description: string;
  registrationPrice: string;
  maxMemberCount: number;
  registrationsCount: number;
}) {
  return (
    <NextLink
      href={`/dashboard/${urlefy(competition)}/${urlefy(title)}`}
      className="group block text-left"
    >
      <figure className="flex w-full flex-col items-start justify-between gap-[54px] rounded-[14px] border border-neutral-100 p-[22px] transition-all duration-300 group-hover:bg-neutral-50 lg:flex-row lg:gap-0">
        <div className="w-full lg:max-w-[854px]">
          {registrationsCount > 0 && (
            <SectionTitle>
              Sudah Mendaftarkan {registrationsCount} tim
            </SectionTitle>
          )}
          <H3 className="mb-[10px] mt-4">{title}</H3>
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
          Lihat Detail
          <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </figure>
    </NextLink>
  );
}

function Competition() {
  const context = useContext(DashboardContext);
  const { competitions, registrations } = context!;

  const [selectedCompetition, setSelectedCompetition] = useState<string>(
    competitions[0].name,
  );
  const [competitionObject, setCompetitionObject] = useState(
    competitions.find(
      (competition) => competition.name === selectedCompetition,
    )!,
  );
  const [categories, setCategories] = useState(
    competitionObject.competitionCategories.filter((category) => {
      const currentDate = getCurrentDateByTimeZone();
      return category.registrationBatches.find(
        ({ openedDate, closedDate }) =>
          currentDate >= openedDate && currentDate <= closedDate,
      );
    }),
  );

  useEffect(() => {
    setCompetitionObject(
      competitions.find(
        (competition) => competition.name === selectedCompetition,
      )!,
    );
    setCategories(
      competitionObject.competitionCategories.filter((category) => {
        const currentDate = getCurrentDateByTimeZone();
        return category.registrationBatches.find(
          ({ openedDate, closedDate }) =>
            currentDate >= openedDate && currentDate <= closedDate,
        );
      }),
    );
  }, [selectedCompetition, competitions, competitionObject]);

  return (
    <section className="w-full py-[82px]" id="kompetisi">
      <div className="mb-[92px] block">
        <div className="flex w-full flex-col items-start justify-between gap-[72px] lg:flex-row lg:items-center lg:gap-0">
          <Link
            href={competitionObject?.guidebookUrl}
            variant={"primary"}
            className="w-full justify-center sm:w-fit"
          >
            <FaBook />
            Lihat guidebook {competitionObject.name}
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
        {categories.length > 0 ? (
          categories.map((category) => {
            const matchedRegistrations = registrations.filter(
              (registration) =>
                registration.registrationBatch.competitionCategory.name ===
                category.name,
            );

            return (
              <CategoryCard
                key={category.id}
                competition={competitionObject.name}
                title={category.name}
                description={category.description}
                maxMemberCount={category.maxMemberCount}
                registrationPrice={formatPrice(
                  Number(
                    category.registrationBatches[
                      category.registrationBatches.length - 1
                    ].registrationPrice,
                  ),
                  "IDR",
                  "id-ID",
                )}
                registrationsCount={matchedRegistrations.length}
              />
            );
          })
        ) : (
          <P>Belum ada kategori apa-apa, nih...</P>
        )}
      </div>
    </section>
  );
}

export { Competition, GreetingBoard };
