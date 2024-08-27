"use client";

import Link from "@/app/_components/global/button";
import { H1, H2, H3, P, SectionTitle } from "@/app/_components/global/text";
import cn from "@/lib/cn";
import {
  announcementWithStage,
  registrationWithMembers,
  stageWithTeam,
} from "@/types/relation";
import {
  formatDateDMY,
  parseLinks,
  urlefy,
  verbalizeDate,
} from "@/utils/utils";
import {
  registered_team,
  registration_batch,
  stage,
  team_member,
} from "@prisma/client";
import Image from "next/image";
import { default as NextLink } from "next/link";
import { useContext } from "react";
import { FaBook, FaLocationDot } from "react-icons/fa6";
import { CompetitionCategoryDetail } from "./contexts";

function AnnouncementCard({
  announcement,
}: {
  announcement: announcementWithStage;
}) {
  return (
    <figure className="w-full rounded-[14px] border border-neutral-100 p-5">
      <P className="mb-1 text-black">{verbalizeDate(announcement.createdAt)}</P>
      <div className="flex w-full flex-col items-start justify-between lg:flex-row lg:items-center">
        <H3 className="mb-2 max-w-[380px] lg:mb-0">{announcement.title}</H3>
        <P
          dangerouslySetInnerHTML={{ __html: parseLinks(announcement.content) }}
        />
      </div>
    </figure>
  );
}

function GreetingBoard({
  announcements,
  team: currentTeam,
  activeStage,
}: {
  announcements: announcementWithStage[];
  team: registered_team;
  activeStage?: stageWithTeam;
}) {
  const context = useContext(CompetitionCategoryDetail);
  const { category, competition } = context!;

  function StageAnnouncement() {
    if (!activeStage) {
      return (
        <div className="flex w-full justify-center rounded-full border border-yellow-400 bg-yellow-50 p-4 text-yellow-400">
          Menunggu pengumuman tahap selanjutnya
        </div>
      );
    }

    return activeStage.teams.find((team) => team.id === currentTeam.id) ? (
      <div className="flex w-full justify-center rounded-full border border-green-400 bg-green-50 p-4 text-green-400">
        Anda berhasil melaju ke {activeStage?.name}
      </div>
    ) : (
      <div className="flex w-full justify-center rounded-full border border-primary-400 bg-primary-50 p-4 text-primary-400">
        Anda gagal melaju ke {activeStage?.name}
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-neutral-100 bg-neutral-50 p-4">
      <StageAnnouncement />
      <div
        className={cn(
          "mb-[54px] mt-6 flex w-full items-center gap-5 lg:gap-10",
        )}
      >
        <Image
          src={competition.logo}
          alt={competition.name}
          width={52}
          height={52}
          className="h-auto w-14 object-cover grayscale"
          unoptimized
        />
        <H1>Bidang {category.name}</H1>
      </div>
      <div className={cn("w-full", announcements.length !== 0 ? "mb-16" : "")}>
        <div className="block">
          <h4
            className={cn(
              "inline-flex rounded-full border px-[14px] py-[6px] uppercase",
              currentTeam.status === "ACCEPTED"
                ? "border-green-500 bg-green-200 text-green-700"
                : "",
              currentTeam.status === "REJECTED"
                ? "border-red-500 bg-red-200 text-red-500"
                : "",
              currentTeam.status === "PENDING"
                ? "border-yellow-500 bg-yellow-50 text-yellow-500"
                : "",
            )}
          >
            {
              {
                ACCEPTED: "Pembayaran diterima",
                REJECTED: "Pembayaran ditolak",
                PENDING: "Menunggu konfirmasi pembayaran",
              }[currentTeam.status]
            }
          </h4>
          <H1 className="mb-2 mt-3">
            Selamat Berkompetisi,{" "}
            <span className="text-primary-400">Tim {currentTeam.teamName}</span>
          </H1>
          <P className="mb-10">{category.description}</P>
          <div className="flex flex-col items-center gap-4 lg:flex-row">
            <Link
              href={competition.guidebookUrl}
              variant={"primary"}
              className="w-full justify-center md:w-fit"
            >
              <FaBook />
              Lihat guidebook {competition.name}
            </Link>
            <Link
              href="#team"
              variant={"primary"}
              className="w-full justify-center md:w-fit"
            >
              Lihat data tim
            </Link>
          </div>
        </div>
      </div>
      {activeStage && (
        <div className="p-4">
          {announcements.length !== 0 && (
            <H2 className="mb-6">Pengumuman di {activeStage.name}</H2>
          )}
          <div className="flex flex-col gap-4">
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
              />
            ))}
          </div>
        </div>
      )}
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

function Timeline({
  categoryName,
  stages,
  batches,
}: {
  categoryName: string;
  stages: stage[];
  batches: registration_batch[];
}) {
  return (
    <section className="w-full py-[82px]" id="timeline">
      <div className="mb-[42px] block">
        <div className="w-full">
          <SectionTitle>TIMELINE</SectionTitle>
          <H1 className="mb-[18px] mt-[22px]">
            Timeline perlombaan {categoryName}
          </H1>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="grid w-full grid-cols-1 gap-[18px] gap-y-[52px] md:grid-cols-2 lg:grid-cols-3">
          {batches
            .sort((a, b) => a.openedDate.getTime() - b.openedDate.getTime())
            .map((batch, i) => (
              <SubTimeline
                key={batch.id}
                startDate={batch.openedDate}
                endDate={batch.closedDate}
                title={batch.batchName}
                description={`Pembukaan pendaftaran batch ${i + 1}`}
                location={"Online"}
              />
            ))}
          {stages
            .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
            .map((stage, i) => (
              <SubTimeline
                key={stage.id}
                startDate={stage.startDate}
                endDate={stage.endDate}
                title={stage.name}
                description={stage.description}
                location={
                  i === stages.length - 1 ? "SMK Telkom Malang" : "Online"
                }
              />
            ))}
        </div>
      </div>
    </section>
  );
}

function TeamMemberCard({
  member,
  teamId,
}: {
  member: team_member;
  teamId: string;
}) {
  const context = useContext(CompetitionCategoryDetail);
  const { competition, category } = context!;

  return (
    <NextLink
      href={`/dashboard/${urlefy(competition.name)}/${urlefy(category.name)}/register-member?id=${member.id}&registrationId=${teamId}`}
      className="flex flex-col rounded-[14px] border border-neutral-100 p-4"
    >
      <div>{member.isLeader && <SectionTitle>Ketua Tim</SectionTitle>}</div>
      <Image
        src={member.photo}
        width={420}
        height={315}
        alt={member.name}
        className="mb-5 mt-2 w-full max-w-[420px] rounded-lg object-cover"
        unoptimized
      />
      <P className="mb-2 text-black">{member.gradeLevel}</P>
      <H2>{member.name}</H2>
    </NextLink>
  );
}

function TeamMembers({ team }: { team: registrationWithMembers }) {
  const context = useContext(CompetitionCategoryDetail);
  const { category, competition } = context!;

  return (
    <section id="team" className="w-full">
      <div className="mb-[54px] flex w-full flex-col justify-between gap-4 md:flex-row md:items-center md:gap-0">
        <div className="block">
          <H1 className="mb-4">
            Data Tim ({team.teamMembers.length} / {category.maxMemberCount})
          </H1>
          <P>Hanya bisa mengubah data tim saat pendaftaran masih dibuka</P>
        </div>
        {team.teamMembers.length !== category.maxMemberCount && (
          <Link
            href={`/dashboard/${urlefy(competition.name)}/${urlefy(category.name)}/register-member?registrationId=${team.id}`}
            variant={"primary"}
            className="w-fit"
          >
            Tambah anggota
          </Link>
        )}
      </div>
      {team.teamMembers.length === 0 && (
        <P className="w-full text-center">Belum ada data anggota...</P>
      )}
      <div className={cn(`grid w-full grid-cols-1 lg:grid-cols-3`)}>
        {team.teamMembers.map((member) => (
          <TeamMemberCard key={member.id} teamId={team.id} member={member} />
        ))}
      </div>
    </section>
  );
}

export { GreetingBoard, TeamMembers, Timeline };
