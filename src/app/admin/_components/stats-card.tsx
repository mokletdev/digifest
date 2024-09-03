import { IconType } from "react-icons";

interface StatsCardProps {
  title: string;
  count: number;
  Icon: IconType;
}

export default function StatsCard({ title, count, Icon }: StatsCardProps) {
  return (
    <div className="flex w-[240px] items-center justify-between rounded-lg bg-primary-300 p-6 shadow-md">
      <div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="text-2xl font-semibold text-white">{count}</p>
      </div>
      <div className="rounded-full bg-secondary-50 p-4 text-primary-400">
        <Icon size={24} />
      </div>
    </div>
  );
}
