import { ReactElement } from "react";

export default function ModalWrapper({ children }: { children: ReactElement }) {
  return (
    <div className="fixed right-0 top-0 z-10 m-auto h-full w-full items-center justify-center overflow-y-scroll bg-gray-300/50 lg:w-[calc(100%-20rem)]">
      <div className="relative top-20 m-auto h-full max-h-full w-full max-w-2xl p-4">
        <div className="relative rounded-lg bg-white">{children}</div>
      </div>
    </div>
  );
}
