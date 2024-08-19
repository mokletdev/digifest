import Link from "@/app/_components/global/button";
import { P } from "@/app/_components/global/text";
import { FaArrowUp, FaInstagram } from "react-icons/fa6";

const socialMedias = [
  { name: "Olimawisa", url: "https://instagram.com/olimawisa" },
  { name: "MIFest", url: "https://instagram.com/mifest" },
];

export default function Footer() {
  return (
    <footer className="ites-start flex w-full flex-col justify-between pb-[42px] pt-[82px] lg:flex-row lg:items-center">
      <P className="lg:max-w-1/2 mb-[32px] max-w-full sm:mb-[52px] sm:max-w-[575px] lg:mb-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ligula
        ipsum, pellentesque ut felis in, porta ultricies massa.
      </P>
      <div className="flex w-full flex-col items-start justify-between gap-[32px] sm:gap-[52px] lg:w-[40%] lg:flex-row lg:items-center lg:gap-0">
        <div className="flex w-fit items-center gap-[38px]">
          {socialMedias.map(({ url, name }) => (
            <Link
              href={url}
              variant={"tertiary"}
              key={name}
              className="text-neutral-500"
            >
              <FaInstagram className="h-6 w-6" /> {name}
            </Link>
          ))}
        </div>
        <Link
          href="#"
          variant={"primary"}
          className="w-full justify-center sm:w-fit"
        >
          Kembali{" "}
          <FaArrowUp className="transition-transform duration-300 group-hover:-translate-y-1" />
        </Link>
      </div>
    </footer>
  );
}
